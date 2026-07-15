$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.InteropServices

$root = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $root 'src\assets\product-valves'
$outputDir = Join-Path $root 'src\assets\product-valves-normalized'

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$files = @(
  'valvula-angular.png',
  'valvula-borboleta.png',
  'valvula-descarga-caldeira.png',
  'valvula-diafragma.png',
  'valvula-esfera.jpg',
  'valvula-gaveta.png',
  'valvula-globo.png',
  'valvula-guilhotina.jpg',
  'valvula-mangote.png',
  'valvula-macho.png',
  'valvula-para-hidrante.jpeg',
  'valvula-passagem-reta.jpg',
  'valvula-redutora-pressao.jpg',
  'valvula-retencao.jpg',
  'valvula-seguranca-alivio.jpg',
  'valvula-solenoide.jpg',
  'valvula-start-up-source.png'
)

$canvasSize = 1200
$padding = 110
$whiteThreshold = 242
$whiteTolerance = 16

function Is-NearWhitePixel {
  param([System.Drawing.Color]$Color)

  if ($Color.A -eq 0) {
    return $true
  }

  $max = [Math]::Max($Color.R, [Math]::Max($Color.G, $Color.B))
  $min = [Math]::Min($Color.R, [Math]::Min($Color.G, $Color.B))

  return ($Color.R -ge $whiteThreshold -and $Color.G -ge $whiteThreshold -and $Color.B -ge $whiteThreshold -and ($max - $min) -le $whiteTolerance)
}

function Get-ArgbBytes {
  param([System.Drawing.Bitmap]$Bitmap)

  $rect = [System.Drawing.Rectangle]::new(0, 0, $Bitmap.Width, $Bitmap.Height)
  $data = $Bitmap.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

  try {
    $byteCount = [Math]::Abs($data.Stride) * $Bitmap.Height
    $bytes = New-Object byte[] $byteCount
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $byteCount)

    return @{
      Data = $data
      Bytes = $bytes
      Stride = $data.Stride
    }
  } catch {
    $Bitmap.UnlockBits($data)
    throw
  }
}

function Set-ArgbBytes {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [hashtable]$Payload
  )

  [System.Runtime.InteropServices.Marshal]::Copy($Payload.Bytes, 0, $Payload.Data.Scan0, $Payload.Bytes.Length)
  $Bitmap.UnlockBits($Payload.Data)
}

foreach ($file in $files) {
  $sourcePath = Join-Path $sourceDir $file
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

  $minX = $working.Width
  $minY = $working.Height
  $maxX = -1
  $maxY = -1

  $payload = Get-ArgbBytes -Bitmap $working

  for ($y = 0; $y -lt $working.Height; $y++) {
    $rowStart = $y * $payload.Stride

    for ($x = 0; $x -lt $working.Width; $x++) {
      $index = $rowStart + ($x * 4)
      $b = $payload.Bytes[$index]
      $g = $payload.Bytes[$index + 1]
      $r = $payload.Bytes[$index + 2]
      $a = $payload.Bytes[$index + 3]

      if ($a -eq 0) {
        continue
      }

      $max = [Math]::Max($r, [Math]::Max($g, $b))
      $min = [Math]::Min($r, [Math]::Min($g, $b))
      $isNearWhite = ($r -ge $whiteThreshold -and $g -ge $whiteThreshold -and $b -ge $whiteThreshold -and ($max - $min) -le $whiteTolerance)

      if ($isNearWhite) {
        $payload.Bytes[$index + 3] = 0
        continue
      }

      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }

  Set-ArgbBytes -Bitmap $working -Payload $payload

  if ($maxX -lt 0 -or $maxY -lt 0) {
    $minX = 0
    $minY = 0
    $maxX = $working.Width - 1
    $maxY = $working.Height - 1
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
    $working,
    [System.Drawing.Rectangle]::new(0, 0, $cropWidth, $cropHeight),
    [System.Drawing.Rectangle]::new($minX, $minY, $cropWidth, $cropHeight),
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
  if ($outputName -eq 'valvula-start-up-source.png') {
    $outputName = 'valvula-start-up.png'
  }
  $outputPath = Join-Path $outputDir $outputName
  $canvas.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Dispose()

  Write-Output "Normalized $file -> $outputName"
}
