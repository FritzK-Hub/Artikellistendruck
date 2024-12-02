param (
    [string]$filePath,
	[string]$installPath
)
$tmpFileName = "temp.xml"
$layoutFileName = "EtikettenLayouts.bcfp"
$xmlFile = "$installPath$tmpFileName"
$layoutFile = "$installPath$layoutFileName"
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

function Append-Xml-Header {
	Clubber-Xml '<?xml version="1.0" encoding="UTF-8"?><printjob labelsperrow="1" printdirection="vertical" startpositionx="1" startpositiony="1" designno="'
	Append-Xml $layout
	Append-Xml '"><printservice name="Microsoft Print to PDF"/>'
}

function Append-Xml-Block {
	param (
		[string]$name,
		[string]$inner,
		[string]$line
	)
	Append-Xml "<$name>"
	$tokens = $line -split ";"
	foreach ($token in $tokens) {
		Append-Xml "<$inner>"
		Append-Xml $token
		Append-Xml "</$inner>"
	}
	Append-Xml "</$name>"
}

function Print {
	param (
		[string]$layout
	)
	[void]$MainForm.Dispose()
	
	Append-Xml-Header
	
	$counter = 0
	Get-Content -Path $filePath | ForEach-Object {
		$line = $_
		if ($counter++ -eq 0) {
			Append-Xml-Block "fieldmap" "field" $line
			Append-Xml '<data>'
			return
		} else {
			Append-Xml-Block "row" "cell" $line
		}
	}
	Append-Xml '</data></printjob>'

	& "$command" $layoutFile $xmlFile
	Return
}


# Setup GUI
Add-Type -AssemblyName System.Windows.Forms
$MainForm                    = New-Object system.Windows.Forms.Form
$MainForm.ClientSize         = '512,92'
$MainForm.text               = "Artikelliste Drucken"
$MainForm.BackColor          = "#ffffff"

$RegalBtn                   = New-Object system.Windows.Forms.Button
$RegalBtn.BackColor         = "#3c3c3b"
$RegalBtn.text              = "Regaletiketten"
$RegalBtn.width             = 200
$RegalBtn.height            = 80
$RegalBtn.location          = New-Object System.Drawing.Point(28,6)
$RegalBtn.Font              = 'Microsoft Sans Serif,18'
$RegalBtn.ForeColor         = "#ffffff"
$RegalBtn.Add_Click({Print "1"})

$HangBtn                   = New-Object system.Windows.Forms.Button
$HangBtn.BackColor         = "#3c3c3b"
$HangBtn.text              = "Haengeetiketten"
$HangBtn.width             = 200
$HangBtn.height            = 80
$HangBtn.location          = New-Object System.Drawing.Point(274,6)
$HangBtn.Font              = 'Microsoft Sans Serif,18'
$HangBtn.ForeColor         = "#ffffff"
$HangBtn.Add_Click({Print "2"})

$MainForm.Controls.Add($RegalBtn)
$MainForm.Controls.Add($HangBtn)

[void]$MainForm.ShowDialog()