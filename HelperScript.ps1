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


function Append-Xml {
	param (
		[string]$content
	)
	$content | Out-File -FilePath $xmlFile -Append -NoNewline -Encoding utf8
}
function Clubber-Xml {
	param (
		[string]$content
	)
	$content | Out-File -FilePath $xmlFile -NoNewline -Encoding utf8
}
$GTIN = '9002701143629'

$svgOut = '<svg id="Barcode" width="100%" height="100%" viewBox="0 0 123 100" preserveAspectRatio="none"> xmlns="http://www.w3.org/2000/svg">'
$offset = 0

$checksum = 105;
$checkmultiplier = 1;
for ($i = 0; $i -lt 6; $i += 2) {
	$svgOut += Append-Svg $Code128Spaces[105][$i] $offset
	$offset += $Code128Spaces[105][$i + 1] + $Code128Spaces[105][$i]
}
foreach ($item in 0..5) {
	$currentValue = [int]($GTIN.Substring($item*2, 2))
	$offsetTotal = ($item * 11 + 11)
	$offsetCurrent = 0
	$checksum += $currentValue * $checkmultiplier
	$checkmultiplier += 1
	for ($i = 0; $i -lt 6; $i += 2) {
		$svgOut += Append-Svg $Code128Spaces[$currentValue][$i] ($offsetTotal + $offsetCurrent)
		$offsetCurrent += $Code128Spaces[$currentValue][$i] + $Code128Spaces[$currentValue][$i+1]
	}
}
$offset = 77 
$checksum += 100 * $checkmultiplier
$checkmultiplier += 1
for ($i = 0; $i -lt 6; $i += 2) {
	$svgOut += Append-Svg $Code128Spaces[100][$i] $offset
	$offset += $Code128Spaces[100][$i + 1] + $Code128Spaces[100][$i]
}
$offset = 88
$value = [int]$GTIN.Substring(12,1) + 16
$checksum += $value * $checkmultiplier
$checksum = $checksum % 103
for ($i = 0; $i -lt 6; $i += 2) {
	$svgOut += Append-Svg $Code128Spaces[$value][$i] $offset
	$offset += $Code128Spaces[$value][$i + 1] + $Code128Spaces[$value][$i]
}
$offset = 99 
for ($i = 0; $i -lt 6; $i += 2) {
	$svgOut += Append-Svg $Code128Spaces[$checksum][$i] $offset
	$offset += $Code128Spaces[$checksum][$i + 1] + $Code128Spaces[$checksum][$i]
}
$offset = 110
for ($i = 0; $i -lt 6; $i += 2) {
	$svgOut += Append-Svg $Code128Spaces[106][$i] $offset
	$offset += $Code128Spaces[106][$i + 1] + $Code128Spaces[106][$i]
}
$svgOut += Append-Svg 2 121
$svgOut += '</svg>'
Clubber-Xml $svgOut