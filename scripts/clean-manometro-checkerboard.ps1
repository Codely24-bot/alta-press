$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.InteropServices

$root = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $root 'src\assets\product-instruments\manometro.png'
$outputPath = Join-Path $root 'src\assets\product-instruments-normalized\manometro.png'

$source = [System.Drawing.Bitmap]::new($sourcePath)
$bitmap = [System.Drawing.Bitmap]::new($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.Clear([System.Drawing.Color]::Transparent)
$graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)
$graphics.Dispose()
$source.Dispose()

$rect = [System.Drawing.Rectangle]::new(0, 0, $bitmap.Width, $bitmap.Height)
$data = $bitmap.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$byteCount = [Math]::Abs($data.Stride) * $bitmap.Height
$bytes = New-Object byte[] $byteCount
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $byteCount)

function Get-Pixel {
  param([int]$X, [int]$Y)
  $index = ($Y * $data.Stride) + ($X * 4)
  return @{
    Index = $index
    B = [int]$bytes[$index]
    G = [int]$bytes[$index + 1]
    R = [int]$bytes[$index + 2]
    A = [int]$bytes[$index + 3]
  }
}

function Is-CheckerBg {
  param($Pixel)

  $max = [Math]::Max($Pixel.R, [Math]::Max($Pixel.G, $Pixel.B))
  $min = [Math]::Min($Pixel.R, [Math]::Min($Pixel.G, $Pixel.B))
  $brightness = ($Pixel.R + $Pixel.G + $Pixel.B) / 3
  $neutral = ($max - $min) -le 18

  return $neutral -and $brightness -ge 220
}

$visited = New-Object 'bool[,]' $bitmap.Width, $bitmap.Height
$queue = [System.Collections.Generic.Queue[object]]::new()

for ($x = 0; $x -lt $bitmap.Width; $x++) {
  $queue.Enqueue(@($x, 0))
  $queue.Enqueue(@($x, ($bitmap.Height - 1)))
}

for ($y = 1; $y -lt ($bitmap.Height - 1); $y++) {
  $queue.Enqueue(@(0, $y))
  $queue.Enqueue(@(($bitmap.Width - 1), $y))
}

while ($queue.Count -gt 0) {
  $point = $queue.Dequeue()
  $x = [int]$point[0]
  $y = [int]$point[1]

  if ($x -lt 0 -or $y -lt 0 -or $x -ge $bitmap.Width -or $y -ge $bitmap.Height) {
    continue
  }

  if ($visited[$x, $y]) {
    continue
  }

  $visited[$x, $y] = $true
  $pixel = Get-Pixel -X $x -Y $y

  if ($pixel.A -eq 0 -or -not (Is-CheckerBg -Pixel $pixel)) {
    continue
  }

  $bytes[$pixel.Index + 3] = 0

  $queue.Enqueue(@(($x + 1), $y))
  $queue.Enqueue(@(($x - 1), $y))
  $queue.Enqueue(@($x, ($y + 1)))
  $queue.Enqueue(@($x, ($y - 1)))
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$bitmap.UnlockBits($data)

$canvasSize = 1200
$padding = 110
$targetBox = $canvasSize - ($padding * 2)
$scale = [Math]::Min($targetBox / $bitmap.Width, $targetBox / $bitmap.Height)
$targetWidth = [int][Math]::Round($bitmap.Width * $scale)
$targetHeight = [int][Math]::Round($bitmap.Height * $scale)
$left = [int][Math]::Round(($canvasSize - $targetWidth) / 2)
$top = [int][Math]::Round(($canvasSize - $targetHeight) / 2)

$canvas = [System.Drawing.Bitmap]::new($canvasSize, $canvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$canvasGraphics = [System.Drawing.Graphics]::FromImage($canvas)
$canvasGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$canvasGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$canvasGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$canvasGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$canvasGraphics.Clear([System.Drawing.Color]::Transparent)
$canvasGraphics.DrawImage($bitmap, $left, $top, $targetWidth, $targetHeight)
$canvasGraphics.Dispose()
$bitmap.Dispose()

$canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()

Write-Output "Saved $outputPath"
