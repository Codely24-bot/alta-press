param(
  [Parameter(Mandatory = $true)][string]$SourceDir,
  [Parameter(Mandatory = $true)][string]$OutputDir,
  [Parameter(Mandatory = $true)][string[]]$Files
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.InteropServices

$root = Split-Path -Parent $PSScriptRoot
$resolvedSourceDir = Join-Path $root $SourceDir
$resolvedOutputDir = Join-Path $root $OutputDir

New-Item -ItemType Directory -Force -Path $resolvedOutputDir | Out-Null

$canvasSize = 1200
$padding = 110
$whiteThreshold = 240
$whiteTolerance = 20

foreach ($file in $Files) {
  $sourcePath = Join-Path $resolvedSourceDir $file
  $bitmap = [System.Drawing.Bitmap]::new($sourcePath)

  $working = [System.Drawing.Bitmap]::new($bitmap.Width, $bitmap.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($working)
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.DrawImage($bitmap, 0, 0, $bitmap.Width, $bitmap.Height)
  $graphics.Dispose()
  $bitmap.Dispose()

  $rect = [System.Drawing.Rectangle]::new(0, 0, $working.Width, $working.Height)
  $data = $working.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $byteCount = [Math]::Abs($data.Stride) * $working.Height
  $bytes = New-Object byte[] $byteCount
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $byteCount)

  $width = $working.Width
  $height = $working.Height
  $mask = New-Object 'bool[,]' $width, $height

  for ($y = 0; $y -lt $height; $y++) {
    $rowStart = $y * $data.Stride

    for ($x = 0; $x -lt $width; $x++) {
      $index = $rowStart + ($x * 4)
      $b = $bytes[$index]
      $g = $bytes[$index + 1]
      $r = $bytes[$index + 2]
      $a = $bytes[$index + 3]

      if ($a -eq 0) {
        continue
      }

      $max = [Math]::Max($r, [Math]::Max($g, $b))
      $min = [Math]::Min($r, [Math]::Min($g, $b))
      $isNearWhite = ($r -ge $whiteThreshold -and $g -ge $whiteThreshold -and $b -ge $whiteThreshold -and ($max - $min) -le $whiteTolerance)

      if ($isNearWhite) {
        $bytes[$index + 3] = 0
        continue
      }

      $mask[$x, $y] = $true
    }
  }

  [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
  $working.UnlockBits($data)

  $visited = New-Object 'bool[,]' $width, $height
  $directions = @(
    @(1, 0),
    @(-1, 0),
    @(0, 1),
    @(0, -1)
  )
  $bestSize = 0
  $bestBounds = $null

  for ($startY = 0; $startY -lt $height; $startY++) {
    for ($startX = 0; $startX -lt $width; $startX++) {
      if (-not $mask[$startX, $startY] -or $visited[$startX, $startY]) {
        continue
      }

      $queue = [System.Collections.Generic.Queue[object]]::new()
      $queue.Enqueue(@($startX, $startY))
      $visited[$startX, $startY] = $true

      $componentSize = 0
      $componentMinX = $startX
      $componentMinY = $startY
      $componentMaxX = $startX
      $componentMaxY = $startY

      while ($queue.Count -gt 0) {
        $point = $queue.Dequeue()
        $x = [int]$point[0]
        $y = [int]$point[1]
        $componentSize++

        if ($x -lt $componentMinX) { $componentMinX = $x }
        if ($y -lt $componentMinY) { $componentMinY = $y }
        if ($x -gt $componentMaxX) { $componentMaxX = $x }
        if ($y -gt $componentMaxY) { $componentMaxY = $y }

        foreach ($direction in $directions) {
          $nextX = $x + $direction[0]
          $nextY = $y + $direction[1]

          if ($nextX -lt 0 -or $nextY -lt 0 -or $nextX -ge $width -or $nextY -ge $height) {
            continue
          }

          if ($visited[$nextX, $nextY] -or -not $mask[$nextX, $nextY]) {
            continue
          }

          $visited[$nextX, $nextY] = $true
          $queue.Enqueue(@($nextX, $nextY))
        }
      }

      if ($componentSize -gt $bestSize) {
        $bestSize = $componentSize
        $bestBounds = @{
          MinX = $componentMinX
          MinY = $componentMinY
          MaxX = $componentMaxX
          MaxY = $componentMaxY
        }
      }
    }
  }

  if ($null -eq $bestBounds) {
    $bestBounds = @{
      MinX = 0
      MinY = 0
      MaxX = $width - 1
      MaxY = $height - 1
    }
  }

  $cropWidth = $bestBounds.MaxX - $bestBounds.MinX + 1
  $cropHeight = $bestBounds.MaxY - $bestBounds.MinY + 1

  $cropped = [System.Drawing.Bitmap]::new($cropWidth, $cropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $cropGraphics = [System.Drawing.Graphics]::FromImage($cropped)
  $cropGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $cropGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $cropGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $cropGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $cropGraphics.Clear([System.Drawing.Color]::Transparent)
  $cropGraphics.DrawImage(
    $working,
    [System.Drawing.Rectangle]::new(0, 0, $cropWidth, $cropHeight),
    [System.Drawing.Rectangle]::new($bestBounds.MinX, $bestBounds.MinY, $cropWidth, $cropHeight),
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $cropGraphics.Dispose()
  $working.Dispose()

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

  $outputName = [System.IO.Path]::GetFileNameWithoutExtension($file) + '.png'
  $outputPath = Join-Path $resolvedOutputDir $outputName
  $canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Dispose()

  Write-Output "Normalized $file -> $outputName"
}
