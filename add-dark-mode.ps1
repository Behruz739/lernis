# Dark Mode Auto-Update Script for Landing.tsx
$filePath = "e:\lernis-mvp\lernis\web\src\pages\Landing.tsx"
$content = Get-Content $filePath -Raw

# Common replacements for dark mode
$replacements = @{
    'text-gray-900' = 'text-gray-900 dark:text-white'
    'text-gray-800' = 'text-gray-800 dark:text-gray-100'
    'text-gray-700' = 'text-gray-700 dark:text-gray-200'
    'text-gray-600' = 'text-gray-600 dark:text-gray-300'
    'text-gray-500' = 'text-gray-500 dark:text-gray-400'
    'bg-white' = 'bg-white dark:bg-gray-800'
    'bg-gray-50' = 'bg-gray-50 dark:bg-gray-900'
    'bg-gray-100' = 'bg-gray-100 dark:bg-gray-800'
    'border-gray-200' = 'border-gray-200 dark:border-gray-700'
    'border-gray-300' = 'border-gray-300 dark:border-gray-600'
    'bg-blue-50' = 'bg-blue-50 dark:bg-blue-900/20'
    'bg-purple-50' = 'bg-purple-50 dark:bg-purple-900/20'
    'bg-green-50' = 'bg-green-50 dark:bg-green-900/20'
    'bg-orange-50' = 'bg-orange-50 dark:bg-orange-900/20'
}

# Apply replacements only where dark: is not already present
foreach ($old in $replacements.Keys) {
    $new = $replacements[$old]
    # Only replace if dark: variant doesn't already exist
    $content = $content -replace "(?<!dark:)(\b$old\b)(?![^""]*dark:)", $new
}

# Save the updated content
Set-Content -Path $filePath -Value $content -NoNewline

Write-Host "Dark mode classes added successfully!" -ForegroundColor Green
Write-Host "File updated: $filePath" -ForegroundColor Cyan
