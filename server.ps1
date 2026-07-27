# Native PowerShell Local Web Server
$port = 8000
$url = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host "==================================================" -ForegroundColor Green
    Write-Host "  Omkar Singh Portfolio Local Web Server Started!  " -ForegroundColor Yellow
    Write-Host "  URL: $url                                       " -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor Green
} catch {
    Write-Host "Failed to start listener on $url. Error: $_" -ForegroundColor Red
    exit 1
}

$rootFolder = $PSScriptRoot
if (-not $rootFolder) { $rootFolder = Get-Location }

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
        if ($urlPath -eq "/") { $urlPath = "/index.html" }

        $localPath = Join-Path $rootFolder ($urlPath.TrimStart('/').Replace('/', '\'))

        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()

            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "text/javascript; charset=utf-8" }
                ".json" { $response.ContentType = "application/json; charset=utf-8" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                ".ico"  { $response.ContentType = "image/x-icon" }
                ".pdf"  { $response.ContentType = "application/pdf" }
                ".xlsx" { $response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
                default { $response.ContentType = "application/octet-stream" }
            }

            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 File Not Found: $urlPath")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # Continue listening on minor requests errors
    }
}
