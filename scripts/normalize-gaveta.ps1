$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.InteropServices

$root = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $root 'src\assets\product-valves\valvula-gaveta.png'
$outputPath = Join-Path $root 'src\assets\product-valves-normalized\valvula-gaveta.png'

New-Item -ItemType Directory -Force -Path (Split-Path $outputPath -Parent) | Out-Null

$source = [System.Drawing.Bitmap]::new($sourcePath)
$bitmap = [System.Drawing.Bitmap]::new($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
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
    B = $bytes[$index]
    G = $bytes[$index + 1]
    R = $bytes[$index + 2]
    A = $bytes[$index + 3]
  }
}

function Set-AlphaZero {
  param([int]$X, [int]$Y)
  $index = ($Y * $data.Stride) + ($X * 4)
  $bytes[$index + 3] = 0
}

function Get-Distance {
  param($P1, $P2)
  return [Math]::Abs([int]$P1.R - [int]$P2.R) + [Math]::Abs([int]$P1.G - [int]$P2.G) + [Math]::Abs([int]$P1.B - [int]$P2.B)
}

$seedPoints = @(
  @{ X = 0; Y = 0 },
  @{ X = $bitmap.Width - 1; Y = 0 },
  @{ X = 0; Y = $bitmap.Height - 1 },
  @{ X = $bitmap.Width - 1; Y = $bitmap.Height - 1 }
)

$seedColors = $seedPoints | ForEach-Object { Get-Pixel -X $_.X -Y $_.Y }
$threshold = 78

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

  if ($pixel.A -eq 0) {
    continue
  }

  $isBackground = $false
  foreach ($seed in $seedColors) {
    if ((Get-Distance -P1 $pixel -P2 $seed) -le $threshold) {
      $isBackground = $true
      break
    }
  }

  if (-not $isBackground) {
    continue
  }

  Set-AlphaZero -X $x -Y $y

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
    $color = $bitmap.GetPixel($x, $y)
    if ($color.A -eq 0) {
      continue
    }

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
