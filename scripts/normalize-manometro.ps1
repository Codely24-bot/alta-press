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

function Distance($a, $b) {
  return [Math]::Abs($a.R - $b.R) + [Math]::Abs($a.G - $b.G) + [Math]::Abs($a.B - $b.B)
}

$seedColors = New-Object System.Collections.ArrayList
foreach ($pt in @(
  @(0,0), @(1,1), @(0,10), @(10,0),
  @(($bitmap.Width-1),0), @(($bitmap.Width-2),1),
  @(0,($bitmap.Height-1)), @(1,($bitmap.Height-2)),
  @(($bitmap.Width-1),($bitmap.Height-1)), @(($bitmap.Width-2),($bitmap.Height-2))
)) {
  [void]$seedColors.Add((Get-Pixel -X ([int]$pt[0]) -Y ([int]$pt[1])))
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

$threshold = 110

while ($queue.Count -gt 0) {
  $point = $queue.Dequeue()
  $x = [int]$point[0]
  $y = [int]$point[1]
  if ($x -lt 0 -or $y -lt 0 -or $x -ge $bitmap.Width -or $y -ge $bitmap.Height) { continue }
  if ($visited[$x, $y]) { continue }
  $visited[$x, $y] = $true

  $pixel = Get-Pixel -X $x -Y $y
  if ($pixel.A -eq 0) { continue }

  $isBackground = $false
  foreach ($seed in $seedColors) {
    if ((Distance $pixel $seed) -le $threshold) {
      $isBackground = $true
      break
    }
  }
  if (-not $isBackground) { continue }

  $bytes[$pixel.Index + 3] = 0
  $queue.Enqueue(@(($x + 1), $y))
  $queue.Enqueue(@(($x - 1), $y))
  $queue.Enqueue(@($x, ($y + 1)))
  $queue.Enqueue(@($x, ($y - 1)))
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$bitmap.UnlockBits($data)

$minX = $bitmap.Width
$minY = $bitmap.Height
$maxX = -1
$maxY = -1
for ($y = 0; $y -lt $bitmap.Height; $y++) {
  for ($x = 0; $x -lt $bitmap.Width; $x++) {
    $c = $bitmap.GetPixel($x, $y)
    if ($c.A -eq 0) { continue }
    if ($x -lt $minX) { $minX = $x }
    if ($y -lt $minY) { $minY = $y }
    if ($x -gt $maxX) { $maxX = $x }
    if ($y -gt $maxY) { $maxY = $y }
  }
}

$cropWidth = $maxX - $minX + 1
$cropHeight = $maxY - $minY + 1
$cropped = [System.Drawing.Bitmap]::new($cropWidth, $cropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$cropGraphics = [System.Drawing.Graphics]::FromImage($cropped)
$cropGraphics.Clear([System.Drawing.Color]::Transparent)
$cropGraphics.DrawImage(
  $bitmap,
  [System.Drawing.Rectangle]::new(0, 0, $cropWidth, $cropHeight),
  [System.Drawing.Rectangle]::new($minX, $minY, $cropWidth, $cropHeight),
  [System.Drawing.GraphicsUnit]::Pixel
)
$cropGraphics.Dispose()
$bitmap.Dispose()

$canvasSize = 1200
$padding = 110
$targetBox = $canvasSize - ($padding * 2)
$scale = [Math]::Min($targetBox / $cropWidth, $targetBox / $cropHeight)
$targetWidth = [int][Math]::Round($cropWidth * $scale)
$targetHeight = [int][Math]::Round($cropHeight * $scale)
$left = [int][Math]::Round(($canvasSize - $targetWidth) / 2)
$top = [int][Math]::Round(($canvasSize - $targetHeight) / 2)

$canvas = [System.Drawing.Bitmap]::new($canvasSize, $canvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$canvasGraphics = [System.Drawing.Graphics]::FromImage($canvas)
$canvasGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$canvasGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$canvasGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$canvasGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$canvasGraphics.Clear([System.Drawing.Color]::Transparent)
$canvasGraphics.DrawImage($cropped, $left, $top, $targetWidth, $targetHeight)
$canvasGraphics.Dispose()
$cropped.Dispose()

$canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()

Write-Output "Saved $outputPath"
