Add-Type -AssemblyName System.Drawing

$root = 'C:\xampp\htdocs\MagnusAssessoria'
$outPath = Join-Path $root 'img\og-preview.jpg'
$w = 1200
$h = 630

$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$g.Clear([System.Drawing.Color]::White)

$verde = [System.Drawing.Color]::FromArgb(2, 93, 64)
$verdeClaro = [System.Drawing.Color]::FromArgb(153, 199, 32)
$cinza = [System.Drawing.Color]::FromArgb(120, 120, 120)

$g.FillRectangle((New-Object System.Drawing.SolidBrush $verde), 0, 0, $w, 6)
$g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(245, 248, 246))), 0, 6, $w, $h - 6)

$logoPath = Join-Path $root 'img\logo-magnus1-semfundo.png'
if (Test-Path $logoPath) {
    $logo = [System.Drawing.Image]::FromFile($logoPath)
    $logoH = 72
    $logoW = [int]($logo.Width * $logoH / $logo.Height)
    $g.DrawImage($logo, 56, 48, $logoW, $logoH)
    $logo.Dispose()
}

$fontImpact = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Bold)
$fontTitle = New-Object System.Drawing.Font('Segoe UI', 36, [System.Drawing.FontStyle]::Bold)
$fontDesc = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular)
$fontBadge = New-Object System.Drawing.Font('Segoe UI', 20, [System.Drawing.FontStyle]::Bold)

$brushVerde = New-Object System.Drawing.SolidBrush $verde
$brushVerdeClaro = New-Object System.Drawing.SolidBrush $verdeClaro
$brushCinza = New-Object System.Drawing.SolidBrush $cinza

$g.DrawString('Maior indice de aprovacao de credito empresarial', $fontImpact, $brushVerde, 56, 138)
$g.DrawString('Consultoria e Assessoria', $fontTitle, $brushVerde, 56, 175)
$g.DrawString('Empresarial Especializada', $fontTitle, $brushVerde, 56, 228)
$rectDesc = New-Object System.Drawing.RectangleF 56, 300, 520, 110
$g.DrawString('Credito pre-aprovado ou em liberacao? Assumimos todo o processo contabil, economico, juridico e administrativo.', $fontDesc, $brushCinza, $rectDesc)

$g.DrawString('+ de 25 mil empresas', $fontBadge, $brushVerde, 56, 470)
$g.DrawString('IMPACTADAS', $fontBadge, $brushVerdeClaro, 56, 508)

$mockupPath = Join-Path $root 'img\mockup.png'
if (Test-Path $mockupPath) {
    $mockup = [System.Drawing.Image]::FromFile($mockupPath)
    $targetW = 520
    $targetH = [int]($mockup.Height * $targetW / $mockup.Width)
    if ($targetH -gt 480) {
        $targetH = 480
        $targetW = [int]($mockup.Width * $targetH / $mockup.Height)
    }
    $x = $w - $targetW - 56
    $y = [int](($h - $targetH) / 2) + 20
    $g.DrawImage($mockup, $x, $y, $targetW, $targetH)
    $mockup.Dispose()
}

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 88L)
$bmp.Save($outPath, $encoder, $encParams)

$g.Dispose()
$bmp.Dispose()

$size = (Get-Item $outPath).Length
Write-Host "OK $outPath ($([math]::Round($size/1KB)) KB)"
