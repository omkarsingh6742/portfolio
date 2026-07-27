$git = 'C:\Program Files\Git\cmd\git.exe'
Remove-Item -Path '.git' -Recurse -Force -ErrorAction SilentlyContinue

& $git init
& $git config user.email "omkarsingh6742@gmail.com"
& $git config user.name "Omkar Singh"
& $git add .
& $git commit -m "Initial commit - Omkar Singh Portfolio"
& $git branch -M main
& $git remote add origin https://github.com/omkarsingh6742/portfolio.git
& $git push -u origin main --force
