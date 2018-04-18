/**
 * Author: Pieter Meiresone
 */
#include "json2.js"

function createArtboardSelectionPanel(name, selected, parent) {
  var panel = parent.add('panel', undefined, name);
  panel.alignChildren = 'left';
  panel.minimumSize.width = 300;
  panel.orientation = 'row';
  panel.alignChildren = 'top';

  var CHECKBOXES_PER_PANEL = 10;
  var totalPanels = Math.ceil(app.activeDocument.artboards.length / CHECKBOXES_PER_PANEL);
  var groups = [];
  for (var panelIndex = 0; panelIndex < totalPanels; panelIndex++) {
    var group = panel.add('group', undefined, name);
    group.orientation = 'column';
    group.alignChildren = 'left';
    groups.push(group);
  }

  for (var artboardIndex = 0; artboardIndex < app.activeDocument.artboards.length; artboardIndex++) {
    var destGroup = groups[Math.floor(artboardIndex / CHECKBOXES_PER_PANEL)];
    var artboard = app.activeDocument.artboards[artboardIndex];

    var cb = destGroup.add('checkbox', undefined, '\u00A0' + artboard.name);
    cb.item = artboard;
    cb.value = false;
    cb.onClick = function() {
      if (this.value) {
        selected[this.item.name] = this.item;
      }
      else {
        delete selected[this.item.name];
      }
    };
  }
}

function createSelectionPanel(name, array, selected, parent) {
  var panel = parent.add('panel', undefined, name);
  panel.alignChildren = 'left';
  panel.minimumSize.width = 400;
  for (var i = 0; i < array.length; i++) {
    var cb = panel.add('checkbox', undefined, '\u00A0' + array[i].type);
    cb.item = array[i];
    cb.value = true;
    cb.onClick = function() {
      if (this.value) {
        selected[this.item.name] = this.item;
        //alert("added " + this.item.name);
      }
      else {
        delete selected[this.item.name];
        //alert("deleted " + this.item.name);
      }
    };
    selected[array[i].name] = array[i];
  }
}

function prepareExportOptions(scale, antiAliasing) {
  var options = new ExportOptionsPNG24();
  options.verticalScale = scale;
  options.horizontalScale = scale;
  options.antiAliasing = antiAliasing;
  options.transparency = true;
  options.artBoardClipping = true;
  return options;
}

function exportAppIcon(expFolder, artboard, name, iconSize) {
  var scale = iconSize * 100 / Math.abs(artboard.artboardRect[1] - artboard.artboardRect[3]);

  if (app.documents.length > 0) {
    var exportOptions = prepareExportOptions(scale, false);
    var exportType = ExportType.PNG24;
    var fileSpec = new File(expFolder.fsName + '/' + name);
    app.activeDocument.exportFile(fileSpec, exportType, exportOptions);
  }
}

function exportImage(expFolder, artboard, name, scale) {
  var exportOptions = prepareExportOptions(scale, true);
  var exportType = ExportType.PNG24;
  var fileSpec = new File(expFolder.fsName + '/' + artboard.name + name + '.png');
  app.activeDocument.exportFile(fileSpec, exportType, exportOptions);
}

var iosAppIconExportOptions = [
  {
    name: '-20@2x.png',
    size: 40,
    type: 'Notification for iPhone with retina display (2x)',
    idiom: 'iphone',
    sizeJSON: '20x20',
    scale: '2x',
  },
  {
    name: '-20@3x.png',
    size: 60,
    type: 'Notification for iPhone with retina display (3x)',
    idiom: 'iphone',
    sizeJSON: '20x20',
    scale: '3x',
  },
  {
    name: '-29@2x.png',
    size: 58,
    type: 'Spotlight iOS 5,6; Settings iOS 5 - 11',
    idiom: 'iphone',
    sizeJSON: '29x29',
    scale: '2x',
  },
  {
    name: '-29@3x.png',
    size: 87,
    type: 'Spotlight iOS 5,6; Settings iOS 5 - 11',
    idiom: 'iphone',
    sizeJSON: '29x29',
    scale: '3x',
  },
  {
    name: '-60@2x.png',
    size: 120,
    type: 'Home screen on iPhone/iPod Touch with retina display',
    idiom: 'iphone',
    sizeJSON: '60x60',
    scale: '2x',
  },
  {
    name: '-60@3x.png',
    size: 180,
    type: 'Home screen on iPhone 6 Plus',
    idiom: 'iphone',
    sizeJSON: '60x60',
    scale: '3x',
  },
  {
    name: '-iPad-29.png',
    size: 29,
    type: 'settings on iPad for iOS 5 - 11',
    idiom: 'ipad',
    sizeJSON: '29x29',
    scale: '1x',
  },
  {
    name: '-iPad-29@2x.png',
    size: 58,
    type: 'settings on iPad with retina display for iOS 5 - 11',
    idiom: 'ipad',
    sizeJSON: '29x29',
    scale: '2x',
  },
  {
    name: '-76.png',
    size: 76,
    type: 'Home screen on iPad',
    idiom: 'ipad',
    sizeJSON: '76x76',
    scale: '1x',
  },
  {
    name: '-76@2x.png',
    size: 152,
    type: 'Home screen on iPad with retina display',
    idiom: 'ipad',
    sizeJSON: '76x76',
    scale: '2x',
  },
  //{
  //     name: "-Small-40.png",
  //     size: 40,
  //     type: "Spotlight",
  //     idiom: "iphone",
  //     sizeJSON: "40x40",
  //     scale: "1x"
  // },
  {
    name: '-Small-40@2x.png',
    size: 80,
    type: 'Spotlight on devices with retina display',
    idiom: 'iphone',
    sizeJSON: '40x40',
    scale: '2x',
  },
  {
    name: '-Small-40@3x.png',
    size: 120,
    type: 'Spotlight on iPhone 6 Plus',
    idiom: 'iphone',
    sizeJSON: '40x40',
    scale: '3x',
  },
  {
    name: '-40.png',
    size: 40,
    type: 'Spotlight for iPad',
    idiom: 'ipad',
    sizeJSON: '40x40',
    scale: '1x',
  },
  {
    name: '-40@2x.png',
    size: 80,
    type: 'Spotlight for iPad with retina display',
    idiom: 'ipad',
    sizeJSON: '40x40',
    scale: '2x',
  },
  {
    name: '-20.png',
    size: 20,
    type: 'Notification for iPad',
    idiom: 'ipad',
    sizeJSON: '20x20',
    scale: '1x',
  },
  {
    name: '-iPad-20@2x.png',
    size: 40,
    type: 'Notification for iPad with retina display',
    idiom: 'ipad',
    sizeJSON: '20x20',
    scale: '2x',
  },
  {
    name: '-iPad-835@2x.png',
    size: 167,
    type: 'Home screen on iPad Pro',
    idiom: 'ipad',
    sizeJSON: '83.5x83.5',
    scale: '2x',
  },
  {
    name: '-Artwork.png',
    size: 1024,
    type: 'Icon on App Store',
    idiom: 'ios-marketing',
    sizeJSON: '1024x1024',
    scale: '1x',
  },
];

var iosImageExportOptions = [
  {
    name: '',
    scaleFactor: 100,
    type: '1x',
  },
  {
    name: '@2x',
    scaleFactor: 200,
    type: '2x',
  },
  {
    name: '@3x',
    scaleFactor: 300,
    type: '3x',
  },
];

var selectedAppIconArtboards = {};
var selectedAppIconExportOptions = {};

var selectedImagesArtboards = {};
var selectedImageExportOptions = {};

function exportAppIcons(folder) {
  for (var artboardName in selectedAppIconArtboards) {
    var artboard = app.activeDocument.artboards.getByName(artboardName);
    var activeIndex = 0;
    while (!(app.activeDocument.artboards[activeIndex].name === artboardName)) {
      activeIndex++;
    }
    app.activeDocument.artboards.setActiveArtboardIndex(activeIndex);


    var expFolder = new Folder(folder.fsName + '/' + artboard.name + '.appiconset' + '/');
    if (!expFolder.exists) {
      expFolder.create();
    }

    var jsonFileObject = {
      images: [],
      info: {
        version: 1,
        author: 'xcode',
      },
    };

    for (var key in selectedAppIconExportOptions) {
      var item = selectedAppIconExportOptions[key];
      jsonFileObject.images.push({
        idiom: item.idiom,
        size: item.sizeJSON,
        filename: artboard.name + item.name,
        scale: item.scale,
      });
    }

    var jsonFile = new File(expFolder.fsName + '/Contents.json');
    jsonFile.open('w');
    jsonFile.write(JSON.stringify(jsonFileObject, null, 2));
    jsonFile.close();

    for (var key in selectedAppIconExportOptions) {
      var item = selectedAppIconExportOptions[key];
      exportAppIcon(expFolder, artboard, artboard.name + item.name, item.size);
    }
  }
}

function exportImages(folder) {
  for (var artboardName in selectedImagesArtboards) {
    var activeArtboard = app.activeDocument.artboards.getByName(artboardName);
    var activeIndex = 0;
    while (!(app.activeDocument.artboards[activeIndex].name === artboardName)) {
      activeIndex++;
    }
    app.activeDocument.artboards.setActiveArtboardIndex(activeIndex);

    var expFolder = new Folder(folder.fsName + '/' + activeArtboard.name + '.imageset' + '/');
    if (!expFolder.exists) {
      expFolder.create();
    }

    var jsonFileObject = {
      images: [],
      info: {
        version: 1,
        author: 'xcode',
      },
    };

    for (var key in selectedImageExportOptions) {
      var item = selectedImageExportOptions[key];
      jsonFileObject.images.push({
        idiom: 'universal',
        scale: item.type,
        filename: activeArtboard.name + item.name + '.png',
      });
    }

    var jsonFile = new File(expFolder.fsName + '/Contents.json');
    jsonFile.open('w');
    jsonFile.write(JSON.stringify(jsonFileObject, null, 2));
    jsonFile.close();

    for (var key in selectedImageExportOptions) {
      if (selectedImageExportOptions.hasOwnProperty(key)) {
        var item = selectedImageExportOptions[key];
        exportImage(expFolder, activeArtboard, item.name, item.scaleFactor);
      }
    }
  }
}

function createDialog(folder) {
  var dialog = new Window('dialog', 'Export assets for iOS');

  var appIconGroup = dialog.add('group');
  appIconGroup.alignChildren = 'top';
  createArtboardSelectionPanel('Select artboards to export as App Icons', selectedAppIconArtboards, appIconGroup);
  createSelectionPanel('Export options for App Icon', iosAppIconExportOptions, selectedAppIconExportOptions, appIconGroup);

  var imageGroup = dialog.add('group');
  imageGroup.alignChildren = 'top';
  createArtboardSelectionPanel('Select artboards to export as images', selectedImagesArtboards, imageGroup);
  createSelectionPanel('Export options for Images', iosImageExportOptions, selectedImageExportOptions, imageGroup);

  var buttonGroup = dialog.add('group');
  var okButton = buttonGroup.add('button', undefined, 'Export');
  var cancelButton = buttonGroup.add('button', undefined, 'Cancel');

  okButton.onClick = function() {
    exportAppIcons(folder);
    exportImages(folder);

    this.parent.parent.close();
  };

  cancelButton.onClick = function() {
    this.parent.parent.close();
  };

  dialog.show();
}

function main() {
  var folder = Folder.selectDialog('Select export directory');
  if (folder) {
    createDialog(folder);
  }
}

if (app.activeDocument) {
  main();
}
