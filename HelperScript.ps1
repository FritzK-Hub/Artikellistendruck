param (
    [string]$filePath,
	[string]$installPath
)

$Code128Spaces = . $PSScriptRoot\Code128Array.ps1

$tmpFileName = "temp.xml"
#$layoutFileName = "EtikettenLayouts.bcfp"
$xmlFile = "$installPath$tmpFileName"
#$layoutFile = "$installPath$layoutFileName"
#$command = "C:\Program Files (x86)\Barcode Forge\bcf.exe"

function Add-Svg {
	param (
		[string]$width,
		[string]$pos
	)
	$out = "`n"
	$out += '<rect width="'
	$out += $width 
	$out += '" height="100" x="'
	$out += $pos
	$out += '" y="0" fill="black" />'
	$out
}

$svgOut = '<svg id="Barcode" width="100%" height="100%" viewBox="0 0 123 100" preserveAspectRatio="none"> xmlns="http://www.w3.org/2000/svg">'
$c128CStart = 105;
$c128ToB = 100;
$c128stop = 106;
$checksum = 105;
$checkmultiplier = 1;
function Add-Code128 {
	param (
		[int]$value,
		[int]$pos
	)
	$checksum += $value * $checkmultiplier
	$offset = $pos
	$checkmultiplier += 1
	$out = ""
	for ($i = 0; $i -lt 6; $i += 2) {
		$out += Add-Svg $Code128Spaces[$value][$i] $offset
		$offset += $Code128Spaces[$value][$i + 1] + $Code128Spaces[$value][$i]
	}
	$out
}
$GTIN = '1234567089054'

$svgOut += Add-Code128 $c128CStart 0
foreach ($item in 0..5) {
	$currentValue = [int]($GTIN.Substring($item*2, 2))
	$offsetTotal = ($item * 11 + 11)
	$offsetCurrent = 0
	$svgOut += Add-Code128 $currentValue ($offsetTotal + $offsetCurrent)
}
$svgOut += Add-Code128 $c128ToB 77
$lastDigit = [int]$GTIN.Substring(12,1) + 16
$svgOut += Add-Code128 $lastDigit 88 
$svgOut += Add-Code128 $checksum 99
$svgOut += Add-Code128 $c128stop 110
$svgOut += Add-Svg 2 121
$svgOut += '</svg>'
$svgOut | Out-File -FilePath $xmlFile -NoNewline -Encoding utf8