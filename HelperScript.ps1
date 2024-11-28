param (
    [string]$filePath
)
$xmlFile = ".\temp.xml"
$command = "C:\Program Files (x86)\Barcode Forge\bcf.exe"

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


function Drucken {
	param (
		[string]$layout
	)
	[void]$MainForm.Dispose()
	
	Clubber-Xml '<?xml version="1.0" encoding="UTF-8"?><printjob labelsperrow="1" printdirection="vertical" startpositionx="1" startpositiony="1"><printservice name="Microsoft Print to PDF"/>'
	$counter = 0
	Get-Content -Path $filePath | ForEach-Object {
		$line = $_
		if ($counter++ -eq 0) {
			Append-Xml '<fieldmap>'
			$tokens = $line -split ";"
			foreach ($token in $tokens) {
				Append-Xml '<field>'
				Append-Xml $token
				Append-Xml '</field>'
			}
			Append-Xml '</fieldmap><data>'
			return
		}
		Append-Xml '<row>'
		$tokens = $line -split ";"
		foreach ($token in $tokens) {
			Append-Xml '<cell>'
			Append-Xml $token
			Append-Xml '</cell>'
		}
		Append-Xml '</row>'
	}
	Append-Xml '</data></printjob>'

	& "$command" $layout $xmlFile
	Return
} 



Add-Type -AssemblyName System.Windows.Forms
$MainForm                    = New-Object system.Windows.Forms.Form
$MainForm.ClientSize         = '512,92'
$MainForm.text               = "Artikelliste Drucken"
$MainForm.BackColor          = "#ffffff"

$RegalBtn                   = New-Object system.Windows.Forms.Button
$RegalBtn.BackColor         = "#ca0a1c"
$RegalBtn.text              = "Regaletiketten"
$RegalBtn.width             = 200
$RegalBtn.height            = 80
$RegalBtn.location          = New-Object System.Drawing.Point(28,6)
$RegalBtn.Font              = 'Microsoft Sans Serif,18'
$RegalBtn.ForeColor         = "#ffffff"
$RegalBtn.Add_Click({Drucken ".\Regaletiketten.bcfp"})

$HangBtn                   = New-Object system.Windows.Forms.Button
$HangBtn.BackColor         = "#ca0a1c"
$HangBtn.text              = "Haengeetiketten"
$HangBtn.width             = 200
$HangBtn.height            = 80
$HangBtn.location          = New-Object System.Drawing.Point(274,6)
$HangBtn.Font              = 'Microsoft Sans Serif,18'
$HangBtn.ForeColor         = "#ffffff"
$HangBtn.Add_Click({Drucken ".\Haengeetiketten.bcfp"})

$MainForm.Controls.Add($RegalBtn)
$MainForm.Controls.Add($HangBtn)

[void]$MainForm.ShowDialog()