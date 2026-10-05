# Generate V9 QC Assets using FFmpeg directly
$video = "projects/persian_editorial_motion_test_v9/renders/final.mp4"
$qc = "projects/persian_editorial_motion_test_v9/qc"
$frames = "$qc/frames"
$trans = "$qc/transitions"

New-Item -ItemType Directory -Force -Path $frames, $trans | Out-Null

Write-Host "Extracting key representative shot frames..."
ffmpeg -y -ss 5.000 -i $video -vframes 1 -q:v 2 "$frames/shot01_hook.jpg"
ffmpeg -y -ss 15.000 -i $video -vframes 1 -q:v 2 "$frames/shot02_decree.jpg"
ffmpeg -y -ss 24.000 -i $video -vframes 1 -q:v 2 "$frames/shot03_c1_gpa.jpg"
ffmpeg -y -ss 31.000 -i $video -vframes 1 -q:v 2 "$frames/shot03_c2_stamp.jpg"
ffmpeg -y -ss 40.000 -i $video -vframes 1 -q:v 2 "$frames/shot03_c3_articles.jpg"
ffmpeg -y -ss 52.000 -i $video -vframes 1 -q:v 2 "$frames/shot04_timewindow.jpg"
ffmpeg -y -ss 66.000 -i $video -vframes 1 -q:v 2 "$frames/shot05_thresholds.jpg"
ffmpeg -y -ss 75.000 -i $video -vframes 1 -q:v 2 "$frames/shot06_outro.jpg"

Write-Host "Assembling 3x2 Master Contact Sheet via FFmpeg filter_complex..."
ffmpeg -y `
  -i "$frames/shot01_hook.jpg" `
  -i "$frames/shot02_decree.jpg" `
  -i "$frames/shot03_c1_gpa.jpg" `
  -i "$frames/shot04_timewindow.jpg" `
  -i "$frames/shot05_thresholds.jpg" `
  -i "$frames/shot06_outro.jpg" `
  -filter_complex "[0:v]scale=640:360[v0];[1:v]scale=640:360[v1];[2:v]scale=640:360[v2];[3:v]scale=640:360[v3];[4:v]scale=640:360[v4];[5:v]scale=640:360[v5];[v0][v1][v2]hstack=inputs=3[row1];[v3][v4][v5]hstack=inputs=3[row2];[row1][row2]vstack=inputs=2[out]" `
  -map "[out]" -q:v 2 "$qc/contact_sheet_master_v9.jpg"

Write-Host "Extracting transition triplets..."
$transitions = @(
  @{ name="t1"; s=11.666; m=12.166; e=12.666 },
  @{ name="t2"; s=20.666; m=21.166; e=21.666 },
  @{ name="t3"; s=48.666; m=49.166; e=49.666 },
  @{ name="t4"; s=56.666; m=57.166; e=57.666 },
  @{ name="t5"; s=71.833; m=72.333; e=72.833 }
)

foreach ($t in $transitions) {
  $n = $t.name
  ffmpeg -y -ss $t.s -i $video -vframes 1 -q:v 2 "$trans/${n}_before.jpg"
  ffmpeg -y -ss $t.m -i $video -vframes 1 -q:v 2 "$trans/${n}_mid.jpg"
  ffmpeg -y -ss $t.e -i $video -vframes 1 -q:v 2 "$trans/${n}_after.jpg"

  ffmpeg -y `
    -i "$trans/${n}_before.jpg" `
    -i "$trans/${n}_mid.jpg" `
    -i "$trans/${n}_after.jpg" `
    -filter_complex "[0:v]scale=640:360[v0];[1:v]scale=640:360[v1];[2:v]scale=640:360[v2];[v0][v1][v2]hstack=inputs=3[out]" `
    -map "[out]" -q:v 2 "$trans/transition_${n}_contact.jpg"
}

Write-Host "Extracting 100% typography crop on Shot 3 GPA 16..."
ffmpeg -y -i "$frames/shot03_c1_gpa.jpg" -filter_complex "crop=800:450:560:315" -q:v 2 "$qc/crop_100pct_center.jpg"

Write-Host "V9 QC Generation Finished Successfully!"
