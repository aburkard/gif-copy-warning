# GIF Copy Warning Chrome Extension

A Chrome extension that warns users when they attempt to copy a GIF image.

## Features

- Detects when a user tries to copy a GIF image
- Shows a confirmation dialog before allowing the copy
- Works on all websites
- Multiple detection methods to catch various ways of copying GIFs
- Monitors both keyboard and context menu copy operations

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory
5. The extension should now be installed and active

## Usage

Simply browse the web as normal. When you attempt to copy a GIF image (using Ctrl+C, right-click copy, drag-and-drop, etc.), 
the extension will detect this action and show a confirmation dialog.

## How it Works

The extension uses several techniques to detect GIF images:
- URL/src pattern matching for .gif extensions
- MIME type detection
- Analysis of image properties
- Context menu integration
- Drag-and-drop event monitoring
- Detection of animated images

## Missing Files

Note: This extension requires icon files (icon48.png and icon128.png) which need to be created and placed in the 
images directory of the extension.

## License

MIT