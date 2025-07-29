var APP_DATA = {
  "scenes": [
    {
      "id": "0-entrance",
      "name": "Entrance",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 0.8174564098308945,
        "pitch": 0.28281082719515815,
        "fov": 1.3900591270580378
      },
      "linkHotspots": [
        {
          "yaw": 0.6716710768830083,
          "pitch": 0.4401064835001076,
          "rotation": 6.283185307179586,
          "target": "1-entrance-stair"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-entrance-stair",
      "name": "Entrance Stair",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 0.5891077414185375,
        "pitch": 0.037018884875053004,
        "fov": 1.3900591270580378
      },
      "linkHotspots": [
        {
          "yaw": 0.4766307538362824,
          "pitch": 0.38140093237829653,
          "rotation": 0,
          "target": "2-main-lobby"
        },
        {
          "yaw": -2.590748556661012,
          "pitch": 1.0021620978029269,
          "rotation": 0,
          "target": "0-entrance"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-main-lobby",
      "name": "Main Lobby",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.4111656150080734,
          "pitch": 0.5324475993732207,
          "rotation": 0.7853981633974483,
          "target": "4-right-main-lobby"
        },
        {
          "yaw": 0.5954223864301689,
          "pitch": 0.5031538324070901,
          "rotation": 5.497787143782138,
          "target": "3-left-main-lobby"
        },
        {
          "yaw": -2.195008093073355,
          "pitch": 0.6862249512496597,
          "rotation": 0,
          "target": "1-entrance-stair"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-left-main-lobby",
      "name": "Left Main Lobby",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.31081096718242485,
          "pitch": 0.5609489789406563,
          "rotation": 0,
          "target": "5-piano-relaxing"
        },
        {
          "yaw": -2.7974940297391164,
          "pitch": 0.5267144812857403,
          "rotation": 0,
          "target": "2-main-lobby"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-right-main-lobby",
      "name": "Right Main Lobby",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.9963988638761769,
          "pitch": 0.41760155099876783,
          "rotation": 0.7853981633974483,
          "target": "2-main-lobby"
        },
        {
          "yaw": -2.1844980806658434,
          "pitch": 0.535375627928266,
          "rotation": 0.7853981633974483,
          "target": "6-drinking-bar"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-piano-relaxing",
      "name": "Piano Relaxing",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.0927769093529065,
          "pitch": 0.4701940669078368,
          "rotation": 0.7853981633974483,
          "target": "3-left-main-lobby"
        },
        {
          "yaw": -1.779687879546131,
          "pitch": 0.5261978500466569,
          "rotation": 5.497787143782138,
          "target": "7-backdoor"
        },
        {
          "yaw": -1.4377239349447315,
          "pitch": 0.3520132942486782,
          "rotation": 0,
          "target": "6-drinking-bar"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-drinking-bar",
      "name": "Drinking Bar",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.7563967260884183,
          "pitch": 0.39183553108258273,
          "rotation": 0,
          "target": "5-piano-relaxing"
        },
        {
          "yaw": -1.3947419598271527,
          "pitch": 0.5524842061335988,
          "rotation": 0.7853981633974483,
          "target": "7-backdoor"
        },
        {
          "yaw": -2.0883176146626923,
          "pitch": 0.5431296346879364,
          "rotation": 5.497787143782138,
          "target": "4-right-main-lobby"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-backdoor",
      "name": "Backdoor",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.4720434893411145,
          "pitch": 0.8546378142284148,
          "rotation": 0.7853981633974483,
          "target": "5-piano-relaxing"
        },
        {
          "yaw": -2.1704049527273117,
          "pitch": 0.7797212900013335,
          "rotation": 5.497787143782138,
          "target": "6-drinking-bar"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Swinburne VR360 Tour",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
