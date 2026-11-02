#!/usr/bin/env bash
# Создаёт варианты изображений для srcset: -480.jpg и -960.jpg.
# Уменьшает только большие файлы ('480x>' не увеличивает маленькие).
# Запуск из корня проекта: bash scripts/make-variants.sh
# Нужен ImageMagick (команда convert).
set -euo pipefail
shopt -s nullglob
for src in images/*.jpg images/*.png; do
  base="${src%.*}"
  case "$base" in *-480|*-640|*-960) continue ;; esac
  convert "$src" -resize '480x>' -quality 85 "${base}-480.jpg"
  convert "$src" -resize '960x>' -quality 85 "${base}-960.jpg"
  echo "готово: $base"
done
