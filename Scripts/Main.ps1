param (
    [string]$FilePath,
	[string]$FileName
)
. $PSScriptRoot\CSVtoHTML.ps1

$articleList = CSVtoHTML -FileName $FileName -CSV $(Get-Content -Path $FilePath -Encoding UTF8)

$guiPath = "$($PSScriptRoot)\..\Interface\Gui.html"
Copy-Item -Path "$($PSScriptRoot)\HTML\Head.html" -Destination $guiPath
$articleList | Out-File -FilePath $guiPath -Append -Encoding UTF8
