$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Runtime.InteropServices
Add-Type -AssemblyName System.Security

$root = Split-Path -Parent $PSScriptRoot
$productSpecsPath = Join-Path $root 'src\data\productTechnicalSpecs.js'
$flangeSpecsPath = Join-Path $root 'src\data\flangeTechnicalSpecs.js'
$rawDir = Join-Path $root 'tmp\catalog-images-raw'
$outputDir = Join-Path $root 'public\catalog-images'
$logoPath = Join-Path $root 'public\brand\altapress-logo.png'
$manifestPath = Join-Path $root 'tmp\catalog-image-manifest.json'

New-Item -ItemType Directory -Force -Path $rawDir | Out-Null
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

if (-not (Test-Path $logoPath)) {
  throw "Logo not found at $logoPath"
}

$logoBitmap = [System.Drawing.Bitmap]::new($logoPath)

function Get-TextFromFile {
  param([string]$Path)

  return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}

function Set-TextToFile {
  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Get-Sha1Hex {
  param([string]$Text)

  $bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
  $hash = [System.Security.Cryptography.SHA1]::Create().ComputeHash($bytes)
  return -join ($hash | ForEach-Object { $_.ToString('x2') })
}

function Convert-ToSlug {
  param([string]$Value)

  $normalized = $Value.Normalize([Text.NormalizationForm]::FormD)
  $builder = New-Object System.Text.StringBuilder

  foreach ($char in $normalized.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($char) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$builder.Append($char)
    }
  }

  $ascii = $builder.ToString().Normalize([Text.NormalizationForm]::FormC).ToLowerInvariant()
  $ascii = [regex]::Replace($ascii, '[^a-z0-9]+', '-').Trim('-')

  if ([string]::IsNullOrWhiteSpace($ascii)) {
    return 'asset'
  }

  return $ascii
}

function Get-OutputNameForUrl {
  param([string]$Url)

  $uri = [Uri]$Url
  $segments = $uri.AbsolutePath.Trim('/').Split('/', [System.StringSplitOptions]::RemoveEmptyEntries)
  $safeSegments = $segments | ForEach-Object { Convert-ToSlug $_ } | Where-Object { $_ }
  $joinedSegments = ($safeSegments -join '-')
  $hash = (Get-Sha1Hex $Url).Substring(0, 10)

  return "$joinedSegments-$hash.png"
}

function Invoke-ImageDownload {
  param(
    [string]$Url,
    [string]$DestinationPath
  )

  Invoke-WebRequest `
    -Uri $Url `
    -OutFile $DestinationPath `
    -Headers @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36' }
}

function Get-ArgbPayload {
  param([System.Drawing.Bitmap]$Bitmap)

  $rect = [System.Drawing.Rectangle]::new(0, 0, $Bitmap.Width, $Bitmap.Height)
  $data = $Bitmap.LockBits(
    $rect,
    [System.Drawing.Imaging.ImageLockMode]::ReadWrite,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )

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

function Set-ArgbPayload {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [hashtable]$Payload
  )

  [System.Runtime.InteropServices.Marshal]::Copy($Payload.Bytes, 0, $Payload.Data.Scan0, $Payload.Bytes.Length)
  $Bitmap.UnlockBits($Payload.Data)
}

function Get-ConnectedComponents {
  param(
    [bool[,]]$Mask,
    [int]$Width,
    [int]$Height
  )

  $visited = New-Object 'bool[,]' $Width, $Height
  $components = [System.Collections.Generic.List[object]]::new()
  $directions = @(
    @(1, 0),
    @(-1, 0),
    @(0, 1),
    @(0, -1)
  )

  for ($startY = 0; $startY -lt $Height; $startY++) {
    for ($startX = 0; $startX -lt $Width; $startX++) {
      if (-not $Mask[$startX, $startY] -or $visited[$startX, $startY]) {
        continue
      }

      $queue = [System.Collections.Generic.Queue[object]]::new()
      $pixels = [System.Collections.Generic.List[object]]::new()
      $queue.Enqueue(@($startX, $startY))
      $visited[$startX, $startY] = $true

      $minX = $startX
      $minY = $startY
      $maxX = $startX
      $maxY = $startY

      while ($queue.Count -gt 0) {
        $point = $queue.Dequeue()
        $x = [int]$point[0]
        $y = [int]$point[1]
        $pixels.Add(@($x, $y))

        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }

        foreach ($direction in $directions) {
          $nextX = $x + $direction[0]
          $nextY = $y + $direction[1]

          if ($nextX -lt 0 -or $nextY -lt 0 -or $nextX -ge $Width -or $nextY -ge $Height) {
            continue
          }

          if ($visited[$nextX, $nextY] -or -not $Mask[$nextX, $nextY]) {
            continue
          }

          $visited[$nextX, $nextY] = $true
          $queue.Enqueue(@($nextX, $nextY))
        }
      }

      $components.Add([PSCustomObject]@{
        Pixels = $pixels
        Area = $pixels.Count
        MinX = $minX
        MinY = $minY
        MaxX = $maxX
        MaxY = $maxY
        Width = $maxX - $minX + 1
        Height = $maxY - $minY + 1
      })
    }
  }

  return $components
}

function Get-ProcessedImageBitmap {
  param(
    [string]$SourcePath,
    [System.Drawing.Bitmap]$LogoBitmap
  )

  $sourceBitmap = [System.Drawing.Bitmap]::new($SourcePath)
  $working = [System.Drawing.Bitmap]::new(
    $sourceBitmap.Width,
    $sourceBitmap.Height,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )

  $graphics = [System.Drawing.Graphics]::FromImage($working)
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.DrawImage($sourceBitmap, 0, 0, $sourceBitmap.Width, $sourceBitmap.Height)
  $graphics.Dispose()
  $sourceBitmap.Dispose()

  $payload = Get-ArgbPayload -Bitmap $working
  $width = $working.Width
  $height = $working.Height
  $mask = New-Object 'bool[,]' $width, $height
  $whiteThreshold = 238
  $whiteTolerance = 28

  for ($y = 0; $y -lt $height; $y++) {
    $rowStart = $y * $payload.Stride

    for ($x = 0; $x -lt $width; $x++) {
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
      $isNearWhite = (
        $r -ge $whiteThreshold -and
        $g -ge $whiteThreshold -and
        $b -ge $whiteThreshold -and
        ($max - $min) -le $whiteTolerance
      )

      if ($isNearWhite) {
        $payload.Bytes[$index + 3] = 0
        continue
      }

      $mask[$x, $y] = $true
    }
  }

  $components = Get-ConnectedComponents -Mask $mask -Width $width -Height $height
  $totalArea = ($components | Measure-Object -Property Area -Sum).Sum
  $keptBounds = @()

  foreach ($component in $components) {
    $inBottomRight = (
      $component.MinX -ge ($width * 0.72) -and
      $component.MinY -ge ($height * 0.72)
    )
    $smallArea = $component.Area -le ($totalArea * 0.08)
    $smallBounds = $component.Width -le ($width * 0.28) -and $component.Height -le ($height * 0.28)
    $dropAsWatermark = $inBottomRight -and $smallArea -and $smallBounds

    if ($dropAsWatermark) {
      foreach ($pixel in $component.Pixels) {
        $px = [int]$pixel[0]
        $py = [int]$pixel[1]
        $index = ($py * $payload.Stride) + ($px * 4)
        $payload.Bytes[$index + 3] = 0
        $mask[$px, $py] = $false
      }
    } else {
      $keptBounds += $component
    }
  }

  Set-ArgbPayload -Bitmap $working -Payload $payload

  if (-not $keptBounds.Count) {
    $keptBounds = $components
  }

  $minX = ($keptBounds | Measure-Object -Property MinX -Minimum).Minimum
  $minY = ($keptBounds | Measure-Object -Property MinY -Minimum).Minimum
  $maxX = ($keptBounds | Measure-Object -Property MaxX -Maximum).Maximum
  $maxY = ($keptBounds | Measure-Object -Property MaxY -Maximum).Maximum

  $cropWidth = [Math]::Max(1, $maxX - $minX + 1)
  $cropHeight = [Math]::Max(1, $maxY - $minY + 1)
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

  $canvasSize = 1200
  $padding = 96
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

  $logoTargetWidth = [int][Math]::Round($canvasSize * 0.30)
  $logoScale = $logoTargetWidth / $LogoBitmap.Width
  $logoTargetHeight = [int][Math]::Round($LogoBitmap.Height * $logoScale)
  $logoMargin = 28
  $logoX = $canvasSize - $logoTargetWidth - $logoMargin
  $logoY = $canvasSize - $logoTargetHeight - $logoMargin
  $canvasGraphics.DrawImage($LogoBitmap, $logoX, $logoY, $logoTargetWidth, $logoTargetHeight)
  $canvasGraphics.Dispose()
  $cropped.Dispose()

  return $canvas
}

$urlRegex = [regex]'"src":\s*"(?<url>https?://[^"]+)"'
$productText = Get-TextFromFile $productSpecsPath
$flangeText = Get-TextFromFile $flangeSpecsPath
$allUrls = [System.Collections.Generic.HashSet[string]]::new()

foreach ($match in $urlRegex.Matches($productText)) {
  [void]$allUrls.Add($match.Groups['url'].Value)
}

foreach ($match in $urlRegex.Matches($flangeText)) {
  [void]$allUrls.Add($match.Groups['url'].Value)
}

$urlMap = [ordered]@{}

foreach ($url in ($allUrls | Sort-Object)) {
  $outputName = Get-OutputNameForUrl $url
  $rawExtension = [System.IO.Path]::GetExtension(([Uri]$url).AbsolutePath)
  if ([string]::IsNullOrWhiteSpace($rawExtension)) {
    $rawExtension = '.img'
  }

  $rawPath = Join-Path $rawDir ($outputName.Replace('.png', $rawExtension))
  $outputPath = Join-Path $outputDir $outputName

  if (-not (Test-Path $rawPath)) {
    Write-Output "Downloading $url"
    Invoke-ImageDownload -Url $url -DestinationPath $rawPath
  }

  Write-Output "Processing $outputName"
  $processedBitmap = Get-ProcessedImageBitmap -SourcePath $rawPath -LogoBitmap $logoBitmap
  $processedBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $processedBitmap.Dispose()

  $urlMap[$url] = "/catalog-images/$outputName"
}

$logoBitmap.Dispose()

foreach ($key in $urlMap.Keys) {
  $productText = $productText.Replace($key, $urlMap[$key])
  $flangeText = $flangeText.Replace($key, $urlMap[$key])
}

Set-TextToFile -Path $productSpecsPath -Content $productText
Set-TextToFile -Path $flangeSpecsPath -Content $flangeText

$urlMap | ConvertTo-Json | Set-Content -Path $manifestPath -Encoding UTF8

Write-Output "Localized $($urlMap.Count) catalog images."
