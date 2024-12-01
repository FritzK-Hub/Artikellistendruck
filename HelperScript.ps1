param (
    [string]$filePath,
	[string]$installPath
)

$Code128Spaces = @(
	@(2,1,2,2,2,2),
	@(2,2,2,1,2,2),
	@(2,2,2,2,2,1),
	@(1,2,1,2,2,3),
	@(1,2,1,3,2,2),
	@(1,3,1,2,2,2),
	@(1,2,2,2,1,3),
	@(1,2,2,3,1,2),
	@(1,3,2,2,1,2),
	@(2,2,1,2,1,3),
	@(2,2,1,3,1,2),
	@(2,3,1,2,1,2),
	@(1,1,2,2,3,2),
	@(1,2,2,1,3,2),
	@(1,2,2,2,3,1),
	@(1,1,3,2,2,2),
	@(1,2,3,1,2,2),
	@(1,2,3,2,2,1),
	@(2,2,3,2,1,1),
	@(2,2,1,1,3,2),
	@(2,2,1,2,3,1),
	@(2,1,3,2,1,2),
	@(2,2,3,1,1,2),
	@(3,1,2,1,3,1),
	@(3,1,1,2,2,2),
	@(3,2,1,1,2,2),
	@(3,2,1,2,2,1),
	@(3,1,2,2,1,2),
	@(3,2,2,1,1,2),
	@(3,2,2,2,1,1),
	@(2,1,2,1,2,3),
	@(2,1,2,3,2,1),
	@(2,3,2,1,2,1),
	@(1,1,1,3,2,3),
	@(1,3,1,1,2,3),
	@(1,3,1,3,2,1),
	@(1,1,2,3,1,3),
	@(1,3,2,1,1,3),
	@(1,3,2,3,1,1),
	@(2,1,1,3,1,3),
	@(2,3,1,1,1,3),
	@(2,3,1,3,1,1),
	@(1,1,2,1,3,3),
	@(1,1,2,3,3,1),
	@(1,3,2,1,3,1),
	@(1,1,3,1,2,3),
	@(1,1,3,3,2,1),
	@(1,3,3,1,2,1),
	@(3,1,3,1,2,1),
	@(2,1,1,3,3,1),
	@(2,3,1,1,3,1),
	@(2,1,3,1,1,3),
	@(2,1,3,3,1,1),
	@(2,1,3,1,3,1),
	@(3,1,1,1,2,3),
	@(3,1,1,3,2,1),
	@(3,3,1,1,2,1),
	@(3,1,2,1,1,3),
	@(3,1,2,3,1,1),
	@(3,3,2,1,1,1),
	@(3,1,4,1,1,1),
	@(2,2,1,4,1,1),
	@(4,3,1,1,1,1),
	@(1,1,1,2,2,4),
	@(1,1,1,4,2,2),
	@(1,2,1,1,2,4),
	@(1,2,1,4,2,1),
	@(1,4,1,1,2,2),
	@(1,4,1,2,2,1),
	@(1,1,2,2,1,4),
	@(1,1,2,4,1,2),
	@(1,2,2,1,1,4),
	@(1,2,2,4,1,1),
	@(1,4,2,1,1,2),
	@(1,4,2,2,1,1),
	@(2,4,1,2,1,1),
	@(2,2,1,1,1,4),
	@(4,1,3,1,1,1),
	@(2,4,1,1,1,2),
	@(1,3,4,1,1,1),
	@(1,1,1,2,4,2),
	@(1,2,1,1,4,2),
	@(1,2,1,2,4,1),
	@(1,1,4,2,1,2),
	@(1,2,4,1,1,2),
	@(1,2,4,2,1,1),
	@(4,1,1,2,1,2),
	@(4,2,1,1,1,2),
	@(4,2,1,2,1,1),
	@(2,1,2,1,4,1),
	@(2,1,4,1,2,1),
	@(4,1,2,1,2,1),
	@(1,1,1,1,4,3),
	@(1,1,1,3,4,1),
	@(1,3,1,1,4,1),
	@(1,1,4,1,1,3),
	@(1,1,4,3,1,1),
	@(4,1,1,1,1,3),
	@(4,1,1,3,1,1),
	@(1,1,3,1,4,1),
	@(1,1,4,1,3,1),
	@(3,1,1,1,4,1),
	@(4,1,1,1,3,1),
	@(2,1,1,4,1,2),
	@(2,1,1,2,1,4),
	@(2,1,1,2,3,2),
	@(2,3,3,1,1,1)
)
$tmpFileName = "temp.xml"
$layoutFileName = "EtikettenLayouts.bcfp"
$xmlFile = "$installPath$tmpFileName"
$layoutFile = "$installPath$layoutFileName"
$command = "C:\Program Files (x86)\Barcode Forge\bcf.exe"

function Append-Svg {
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
function Concat-Svg {
	param (
		[int]$value,
		[int]$pos
	)
	$checksum += $value * $checkmultiplier
	$offset = $pos
	$checkmultiplier += 1
	$out = ""
	for ($i = 0; $i -lt 6; $i += 2) {
		$out += Append-Svg $Code128Spaces[$value][$i] $offset
		$offset += $Code128Spaces[$value][$i + 1] + $Code128Spaces[$value][$i]
	}
	$out
}
$GTIN = '1234567089054'

$svgOut += Concat-Svg $c128CStart 0
foreach ($item in 0..5) {
	$currentValue = [int]($GTIN.Substring($item*2, 2))
	$offsetTotal = ($item * 11 + 11)
	$offsetCurrent = 0
	$svgOut += Concat-Svg $currentValue ($offsetTotal + $offsetCurrent)
}
$svgOut += Concat-Svg $c128ToB 77
$lastDigit = [int]$GTIN.Substring(12,1) + 16
$svgOut += Concat-Svg $lastDigit 88 
$svgOut += Concat-Svg $checksum 99
$svgOut += Concat-Svg $c128stop 110
$svgOut += Append-Svg 2 121
$svgOut += '</svg>'
$svgOut | Out-File -FilePath $xmlFile -NoNewline -Encoding utf8