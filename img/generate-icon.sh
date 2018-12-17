#!/bin/bash

SIZE="48" 
inkscape --export-png=icon${SIZE}.png --export-area-page --export-height=$SIZE --export-width=$SIZE ./logo.svg

SIZE="192" 
inkscape --export-png=icon${SIZE}.png --export-area-page --export-height=$SIZE --export-width=$SIZE ./logo.svg

SIZE="48" 
inkscape --export-png=icon${SIZE}-inverse.png --export-area-page --export-height=$SIZE --export-width=$SIZE ./logo-inverse.svg

SIZE="192" 
inkscape --export-png=icon${SIZE}-inverse.png --export-area-page --export-height=$SIZE --export-width=$SIZE ./logo-inverse.svg
set +x
