[CmdletBinding()]
param(
  [string]$OnlyMatch
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$repoRoot = Split-Path -Parent $PSScriptRoot
$logoSourcePath = Join-Path $repoRoot 'public\brand\altapress-logo-cartoon-source.png'
$logoPath = Join-Path $repoRoot 'public\brand\altapress-logo-cartoon.png'
$assetRoot = Join-Path $repoRoot 'src\assets'
$targetDirectories = @(
  'product-accessories-normalized',
  'product-categories',
  'product-connections-normalized',
  'product-connections-options',
  'product-diversos-normalized',
  'product-filters-normalized',
  'product-flanges',
  'product-flanges-normalized',
  'product-instruments-normalized',
  'product-purgadores-normalized',
  'product-valves',
  'product-valves-guilhotina',
  'product-valves-guilhotina-gallery',
  'product-valves-normalized',
  'product-valves-options',
  'product-valves-solenoides-normalized',
  'product-vedacoes-normalized'
)

function Get-ImageCodecInfo {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Extension
  )

  $mimeType = switch ($Extension.ToLowerInvariant()) {
    '.jpg' { 'image/jpeg' }
    '.jpeg' { 'image/jpeg' }
    '.png' { 'image/png' }
    default { throw "Formato não suportado: $Extension" }
  }

  return [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq $mimeType } |
    Select-Object -First 1
}

function New-CroppedLogoBitmap {
  param(
    [Parameter(Mandatory = $true)]
    [System.Drawing.Bitmap]$Bitmap
  )

  $minX = $Bitmap.Width
  $minY = $Bitmap.Height
  $maxX = -1
  $maxY = -1

  for ($y = 0; $y -lt $Bitmap.Height; $y++) {
    for ($x = 0; $x -lt $Bitmap.Width; $x++) {
      $pixel = $Bitmap.GetPixel($x, $y)
      if ($pixel.A -gt 0) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  if ($maxX -lt 0 -or $maxY -lt 0) {
    throw 'Nao foi possivel localizar pixels visiveis na logo cartoon.'
  }

  $cropWidth = $maxX - $minX + 1
  $cropHeight = $maxY - $minY + 1
  $croppedBitmap = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

  $graphics = [System.Drawing.Graphics]::FromImage($croppedBitmap)
  try {
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $sourceRect = New-Object System.Drawing.Rectangle($minX, $minY, $cropWidth, $cropHeight)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $cropWidth, $cropHeight)
    $graphics.DrawImage($Bitmap, $destRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
  }
  finally {
    $graphics.Dispose()
  }

  return $croppedBitmap
}

function Get-PreparedLogo {
  param(
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,
    [Parameter(Mandatory = $true)]
    [string]$OutputPath
  )

  $sourceBitmap = New-Object System.Drawing.Bitmap($SourcePath)

  try {
    $preparedBitmap = New-Object System.Drawing.Bitmap($sourceBitmap.Width, $sourceBitmap.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    try {
      for ($y = 0; $y -lt $sourceBitmap.Height; $y++) {
        for ($x = 0; $x -lt $sourceBitmap.Width; $x++) {
          $pixel = $sourceBitmap.GetPixel($x, $y)
          $isNearWhite = $pixel.R -ge 242 -and $pixel.G -ge 242 -and $pixel.B -ge 242

          if ($isNearWhite) {
            $preparedBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
          }
          else {
            $preparedBitmap.SetPixel($x, $y, $pixel)
          }
        }
      }

      $croppedBitmap = New-CroppedLogoBitmap -Bitmap $preparedBitmap

      try {
        $croppedBitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
      }
      finally {
        $croppedBitmap.Dispose()
      }
    }
    finally {
      $preparedBitmap.Dispose()
    }
  }
  finally {
    $sourceBitmap.Dispose()
  }

  return [System.Drawing.Image]::FromFile($OutputPath)
}

function Save-BrandedImage {
  param(
    [Parameter(Mandatory = $true)]
    [string]$FilePath,
    [Parameter(Mandatory = $true)]
    [System.Drawing.Image]$Logo
  )

  $extension = [System.IO.Path]::GetExtension($FilePath)
  $baseName = [System.IO.Path]::GetFileNameWithoutExtension($FilePath).ToLowerInvariant()
  $codec = Get-ImageCodecInfo -Extension $extension
  $tempPath = "$FilePath.tmp"

  $sourceStream = [System.IO.File]::Open($FilePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)

  try {
    $sourceImage = [System.Drawing.Image]::FromStream($sourceStream)

    try {
      $bitmap = New-Object System.Drawing.Bitmap($sourceImage.Width, $sourceImage.Height)
      $bitmap.SetResolution($sourceImage.HorizontalResolution, $sourceImage.VerticalResolution)

      try {
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

        try {
          $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
          $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
          $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
          $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

          $graphics.DrawImage($sourceImage, 0, 0, $sourceImage.Width, $sourceImage.Height)

          $logoTargetWidth = [math]::Round($sourceImage.Width * 0.18)
          $maxLogoWidth = [math]::Round($sourceImage.Width * 0.24)
          $logoWidth = [math]::Max(72, [math]::Min($logoTargetWidth, $maxLogoWidth))
          $logoHeight = [math]::Round($logoWidth * ($Logo.Height / $Logo.Width))
          $verticalPadding = [math]::Max(12, [math]::Round([math]::Min($sourceImage.Width, $sourceImage.Height) * 0.035))
          $horizontalPadding = [math]::Max(12, [math]::Round([math]::Min($sourceImage.Width, $sourceImage.Height) * 0.035))
          if ($baseName -eq 'fita-ptfe') {
            $horizontalPadding = 0
          }

          $logoX = $sourceImage.Width - $horizontalPadding - $logoWidth
          $logoY = $sourceImage.Height - $verticalPadding - $logoHeight

          $graphics.DrawImage($Logo, $logoX, $logoY, $logoWidth, $logoHeight)

          if ($extension -match '\.jpe?g$') {
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($qualityEncoder, 92L)
            $bitmap.Save($tempPath, $codec, $encoderParams)
            $encoderParams.Dispose()
          }
          else {
            $bitmap.Save($tempPath, $codec, $null)
          }
        }
        finally {
          $graphics.Dispose()
        }
      }
      finally {
        $bitmap.Dispose()
      }
    }
    finally {
      $sourceImage.Dispose()
    }
  }
  finally {
    $sourceStream.Dispose()
  }

  Move-Item -LiteralPath $tempPath -Destination $FilePath -Force
}

$logo = Get-PreparedLogo -SourcePath $logoSourcePath -OutputPath $logoPath

try {
  $files = foreach ($directoryName in $targetDirectories) {
    $directoryPath = Join-Path $assetRoot $directoryName
    if (Test-Path $directoryPath) {
      Get-ChildItem -Path $directoryPath -File -Recurse |
        Where-Object {
          $_.Extension -match '^\.(png|jpe?g)$' -and
          ([string]::IsNullOrWhiteSpace($OnlyMatch) -or $_.Name -like $OnlyMatch)
        }
    }
  }

  foreach ($file in $files) {
    Save-BrandedImage -FilePath $file.FullName -Logo $logo
  }

  Write-Output ("Branded {0} product images." -f $files.Count)
}
finally {
  $logo.Dispose()
}
