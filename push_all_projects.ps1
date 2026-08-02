$git = 'C:\Program Files\Git\cmd\git.exe'
Remove-Item -Path 'inspect_projects.ps1', 'inspect_more.ps1', 'temp_excel2.zip', 'temp_pbix.zip' -Force -ErrorAction SilentlyContinue
Remove-Item -Path 'scratch_excel2', 'scratch_pbix' -Recurse -Force -ErrorAction SilentlyContinue

& $git add .
& $git commit -m "Add interactive online previews and downloads for all 3 projects"
& $git push origin main
