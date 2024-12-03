function CSVtoHTML {
    param (
        [string]$FileName,
        [string[]]$CSV
    )
    $titleData = $FileName
    $gtinData = ""
    $articleNrData = "" 
    $nameData = "" 
    $priceData = "" 
    $sourceData = "" 
    
    $counter = -1
    $CSV | ForEach-Object {
        if ($counter++ -eq -1) {
            return
        }
        $tokens = $_.Split(";")
        $sourceToken = $tokens[5]

        $gtinData += $tokens[0] + ";"
        $articleNrData += $tokens[1] + ";"
        $nameData += $tokens[2] + ";"
        $priceData += $tokens[3] + ";"
        $sourceData += $sourceToken.Replace("Strecke ", "").Replace("Lager ", "") + ";"
    }

    $dataBuilder =  $(InnerDiv $titleData "Title-Data")
    $dataBuilder += $(InnerDiv $gtinData "GTIN-Data")
    $dataBuilder += $(InnerDiv $articleNrData "ArticleNr-Data")
    $dataBuilder += $(InnerDiv $nameData "Name-Data")
    $dataBuilder += $(InnerDiv $priceData "Price-Data")
    $dataBuilder += $(InnerDiv $sourceData "Source-Data")

    return $(OuterDiv -innerData $dataBuilder -amount $counter)
}

function InnerDiv {
    param (
        [string]$innerData,
        [string]$id
    )
return @"
    <div id='{0}'>
        {1}
    </div>`n
"@ -f $id, $innerData
}

function OuterDiv {
    param (
        [string]$innerData,
        [string]$amount
    )
    return @"
<div id='Article-Data' amount='{0}' class="hide dont-print">
    {1}
</div>
</body>
</html>
"@ -f $amount, $innerData
}