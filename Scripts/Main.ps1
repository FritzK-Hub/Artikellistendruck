param (
    [string]$FilePath,
	[string]$FileName
)
# Load all scripts
. $PSScriptRoot\CSVtoHTML.ps1

$articleList = CSVtoHTML -FileName $FileName -CSV $(Get-Content -Path $FilePath)
# $articleList | Out-File -FilePath ".\test.html" -NoNewline -Encoding utf8

$guiPath = "$($PSScriptRoot)\..\Core\Gui.html"
Copy-Item -Path "$($PSScriptRoot)\HTML\Head.html" -Destination $guiPath
$articleList | Out-File -FilePath $guiPath -Append -Encoding utf8

# Get-ChildItem -Path $PSScriptRoot\Barcodes -Include *.* -File -Recurse | ForEach-Object { $_.Delete()}
# $Code128Spaces = . $PSScriptRoot\Code128Array.ps1

# $articleAmount = 1;
# $svgFileNames = [System.Collections.ArrayList]@()
# $svgFile = "code_" + $([string]$articleAmount) + ".svg"
# $articleAmount = 2;
# $svgFile2 = "code_" + $([string]$articleAmount) + ".svg"
# $svgFileNames.Add($svgFile)
# $svgFileNames.Add($svgFile2)
# $xmlFile = "$PSScriptRoot\Barcodes\" + $svgFileNames[0]
# $xmlFile = "$PSScriptRoot\Barcodes\" + $svgFileNames[1]
# Write-Host $svgFileNames

# function Add-Svg {
# 	param (
# 		[string]$width,
# 		[string]$pos
# 	)
# 	$out = "`n"
# 	$out += '<rect width="'
# 	$out += $width 
# 	$out += '" height="100" x="'
# 	$out += $pos
# 	$out += '" y="0" fill="black" />'
# 	$out
# }

# $svgOut = '<svg id="Barcode" width="100%" height="100%" viewBox="0 0 123 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
# $c128CStart = 105;
# $c128ToB = 100;
# $c128stop = 106;
# $checksum = 105;
# $checkmultiplier = 1;
# function Add-Code128 {
# 	param (
# 		[int]$value,
# 		[int]$pos
# 	)
# 	$checksum += $value * $checkmultiplier
# 	$offset = $pos
# 	$checkmultiplier += 1
# 	$out = ""
# 	for ($i = 0; $i -lt 6; $i += 2) {
# 		$out += Add-Svg $Code128Spaces[$value][$i] $offset
# 		$offset += $Code128Spaces[$value][$i + 1] + $Code128Spaces[$value][$i]
# 	}
# 	$out
# }
# $GTIN = '1234567089054'

# $svgOut += Add-Code128 $c128CStart 0
# foreach ($item in 0..5) {
# 	$currentValue = [int]($GTIN.Substring($item*2, 2))
# 	$offsetTotal = ($item * 11 + 11)
# 	$offsetCurrent = 0
# 	$svgOut += Add-Code128 $currentValue ($offsetTotal + $offsetCurrent)
# }
# $svgOut += Add-Code128 $c128ToB 77
# $lastDigit = [int]$GTIN.Substring(12,1) + 16
# $svgOut += Add-Code128 $lastDigit 88 
# $svgOut += Add-Code128 $checksum 99
# $svgOut += Add-Code128 $c128stop 110
# $svgOut += Add-Svg 2 121
# $svgOut += '</svg>'
# $svgOut | Out-File -FilePath $xmlFile -NoNewline -Encoding utf8
