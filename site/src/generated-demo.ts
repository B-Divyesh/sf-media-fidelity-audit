// Generated from mfa demo by site/scripts/generate-demo.mjs.
export const demoResult = {
  "summary": {
    "source_files": 5,
    "matched": 3,
    "changed": 1,
    "missing": 1,
    "unreadable": 0,
    "moved": 0,
    "archive_only": 0,
    "sidecars": 1,
    "live_photo_pairs": 1,
    "all_byte_identical": false
  },
  "assets": [
    {
      "relative_path": "2025/beach-live.HEIC",
      "status": "identical",
      "kind": "image",
      "media": {
        "format": "isobmff/heic",
        "width": null,
        "height": null,
        "codec": "hvc1",
        "fps": null,
        "exif_sha256": null,
        "orientation": null,
        "captured_at": null,
        "camera": null
      }
    },
    {
      "relative_path": "2025/beach-live.MOV",
      "status": "identical",
      "kind": "video",
      "media": {
        "format": "isobmff/qt  ",
        "width": null,
        "height": null,
        "codec": "avc1",
        "fps": "24",
        "exif_sha256": null,
        "orientation": null,
        "captured_at": null,
        "camera": null
      }
    },
    {
      "relative_path": "2025/birthday.jpg",
      "status": "identical",
      "kind": "image",
      "media": {
        "format": "jpeg",
        "width": 640,
        "height": 420,
        "codec": null,
        "fps": null,
        "exif_sha256": "f8ca382f3390f70ddda74b32ce1dde2bcf918722a45b65fce23043dcee7330b2",
        "orientation": null,
        "captured_at": "2025:08:28 10:11:12",
        "camera": "MFA Field Camera PaperCut 1"
      }
    },
    {
      "relative_path": "2025/family.jpg",
      "status": "changed",
      "kind": "image",
      "media": {
        "format": "jpeg",
        "width": 640,
        "height": 420,
        "codec": null,
        "fps": null,
        "exif_sha256": null,
        "orientation": null,
        "captured_at": null,
        "camera": null
      }
    },
    {
      "relative_path": "2025/family.xmp",
      "status": "missing",
      "kind": "sidecar",
      "media": null
    }
  ],
  "livePhotoPair": {
    "still": "2025/beach-live.HEIC",
    "motion": "2025/beach-live.MOV",
    "status": "both byte-identical"
  }
} as const;
