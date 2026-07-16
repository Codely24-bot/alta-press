$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.InteropServices

$root = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $root 'src\assets\product-instruments'
$outputDir = Join-Path $root 'src\assets\product-instruments-normalized'

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$jobs = @(
  @{ Name = 'manometro.png'; Threshold = 90; Bright = $null },
  @{ Name = 'pressostatos.png'; Threshold = 70; Bright = 245 },
  @{ Name = 'termometro.png'; Threshold = 70; Bright = 245 },
  @{ Name = 'vacuometro.png'; Threshold = 70; Bright = 20 }
)

$canvasSize = 1200
$padding = 110

foreach ($job in $jobs) {
  $sourcePath = Join-Path $sourceDir $job.Name
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

  $minX = $bitmap.Width
  $minY = $bitmap.Height
  $maxX = -1
  $maxY = -1

  for ($y = 0; $y -lt $bitmap.Height; $y++) {
    $rowStart = $y * $data.Stride

    for ($x = 0; $x -lt $bitmap.Width; $x++) {
      $index = $rowStart + ($x * 4)
      $b = [int]$bytes[$index]
      $g = [int]$bytes[$index + 1]
      $r = [int]$bytes[$index + 2]
      $a = [int]$bytes[$index + 3]

      if ($a -eq 0) {
        continue
      }

      $max = [Math]::Max($r, [Math]::Max($g, $b))
      $min = [Math]::Min($r, [Math]::Min($g, $b))
      $isNeutral = ($max - $min) -le $job.Threshold

      $isBackground = $false
      if ($job.Bright -eq $null) {
        $isBackground = $isNeutral -and (($r -ge 190 -and $g -ge 190 -and $b -ge 190) -or ($r -le 235 -and $g -le 235 -and $b -le 235))
      } elseif ($job.Bright -ge 128) {
        $isBackground = $isNeutral -and $r -ge $job.Bright -and $g -ge $job.Bright -and $b -ge $job.Bright
      } else {
        $isBackground = $isNeutral -and $r -le $job.Bright -and $g -le $job.Bright -and $b -le $job.Bright
      }

      if ($isBackground) {
        $bytes[$index + 3] = 0
        continue
      }

      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }

  [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
  $bitmap.UnlockBits($data)

  if ($maxX -lt 0 -or $maxY -lt 0) {
    $minX = 0
    $minY = 0
    $maxX = $bitmap.Width - 1
    $maxY = $bitmap.Height - 1
  }

  $cropWidth = $maxX - $minX + 1
  $cropHeight = $maxY - $minY + 1
  $cropped = [System.Drawing.Bitmap]::new($cropWidth, $cropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $cropGraphics = [System.Drawing.Graphics]::FromImage($cropped)
  $cropGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $cropGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $cropGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $cropGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $cropGraphics.Clear([System.Drawing.Color]::Transparent)
  $cropGraphics.DrawImage(
    $bitmap,
    [System.Drawing.Rectangle]::new(0, 0, $cropWidth, $cropHeight),
    [System.Drawing.Rectangle]::new($minX, $minY, $cropWidth, $cropHeight),
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $cropGraphics.Dispose()
  $bitmap.Dispose()

  $targetBox = $canvasSize - ($padding * 2)
  $scale = [Math]::Min($targetBox / $cropWidth, $targetBox / $cropHeight)
  $targetWidth = [Math]::Max(1, [int][Math]::Round($cropWidth * $scale))
  $targetHeight = [Math]::Max(1, [int][Math]::Round($cropHeight * $scale))
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

  $outputName = [System.IO.Path]::GetFileNameWithoutExtension($job.Name) + '.png'
  $outputPath = Join-Path $outputDir $outputName
  $canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Dispose()

  Write-Output "Normalized $($job.Name) -> $outputName"
}
