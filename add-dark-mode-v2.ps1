# Improved Dark Mode Script for Landing.tsx
$filePath = "e:\lernis-mvp\lernis\web\src\pages\Landing.tsx"
$content = Get-Content $filePath -Raw

# More comprehensive replacements
$patterns = @(
    @{ old = '(?<!")text-gray-900(?!")(?![^"]*dark:)'; new = 'text-gray-900 dark:text-white' }
    @{ old = '(?<!")text-gray-800(?!")(?![^"]*dark:)'; new = 'text-gray-800 dark:text-gray-100' }
    @{ old = '(?<!")text-gray-700(?!")(?![^"]*dark:)'; new = 'text-gray-700 dark:text-gray-200' }
    @{ old = '(?<!")text-gray-600(?!")(?![^"]*dark:)'; new = 'text-gray-600 dark:text-gray-300' }
    @{ old = '(?<!")text-gray-500(?!")(?![^"]*dark:)'; new = 'text-gray-500 dark:text-gray-400' }
    @{ old = '(?<!")bg-white(?!")(?![^"]*dark:)'; new = 'bg-white dark:bg-gray-800' }
    @{ old = '(?<!")bg-gray-50(?!")(?![^"]*dark:)'; new = 'bg-gray-50 dark:bg-gray-900' }
    @{ old = '(?<!")bg-gray-100(?!")(?![^"]*dark:)'; new = 'bg-gray-100 dark:bg-gray-800' }
    @{ old = '(?<!")bg-gray-200(?!")(?![^"]*dark:)'; new = 'bg-gray-200 dark:bg-gray-700' }
    @{ old = '(?<!")border-gray-200(?!")(?![^"]*dark:)'; new = 'border-gray-200 dark:border-gray-700' }
    @{ old = '(?<!")border-gray-300(?!")(?![^"]*dark:)'; new = 'border-gray-300 dark:border-gray-600' }
    @{ old = '(?<!")border-white(?!")(?![^"]*dark:)'; new = 'border-white dark:border-gray-700' }
    @{ old = '(?<!")bg-blue-50(?!")(?![^"]*dark:)'; new = 'bg-blue-50 dark:bg-blue-900/20' }
    @{ old = '(?<!")bg-purple-50(?!")(?![^"]*dark:)'; new = 'bg-purple-50 dark:bg-purple-900/20' }
    @{ old = '(?<!")bg-green-50(?!")(?![^"]*dark:)'; new = 'bg-green-50 dark:bg-green-900/20' }
    @{ old = '(?<!")bg-orange-50(?!")(?![^"]*dark:)'; new = 'bg-orange-50 dark:bg-orange-900/20' }
    @{ old = '(?<!")bg-pink-50(?!")(?![^"]*dark:)'; new = 'bg-pink-50 dark:bg-pink-900/20' }
    @{ old = '(?<!")bg-yellow-50(?!")(?![^"]*dark:)'; new = 'bg-yellow-50 dark:bg-yellow-900/20' }
)

foreach ($pattern in $patterns) {
    $content = $content -replace $pattern.old, $pattern.new
}

Set-Content -Path $filePath -Value $content -NoNewline

Write-Host "✅ Dark mode fully applied!" -ForegroundColor Green
Write-Host "📄 File: $filePath" -ForegroundColor Cyan
