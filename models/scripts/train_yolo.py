"""Fine-tune YOLO on the plate dataset (Table 4.6). Fill the blanks before running."""
import random

import numpy as np
import torch
from ultralytics import YOLO

# ---- fill in -----------------------------------------------------------------
DATA_YAML   = "configs/plate_data.yaml"     # dataset paths go inside this file
PRETRAINED  = "____________________"       # e.g. a pretrained YOLO .pt checkpoint
EPOCHS      = 0                             # TODO
BATCH       = 0                             # TODO
IMG_SIZE    = 640
LR0         = 0.01
OPTIMIZER   = "auto"                        # "SGD" | "Adam" | "AdamW" | "auto"
SEED        = 42
PROJECT     = "runs/models"
RUN_NAME    = "plate_detector"
DEVICE      = None                          # None=auto, "0", "cpu"
# ------------------------------------------------------------------------------


def main():
    random.seed(SEED); np.random.seed(SEED); torch.manual_seed(SEED)
    model = YOLO(PRETRAINED)                # transfer learning; single class from the data yaml
    model.train(
        data=DATA_YAML, epochs=EPOCHS, batch=BATCH, imgsz=IMG_SIZE, lr0=LR0,
        optimizer=OPTIMIZER, seed=SEED, project=PROJECT, name=RUN_NAME, device=DEVICE,
        deterministic=True, plots=True,
        # augmentation (train set only) -- tune as needed
        hsv_h=0.015, hsv_s=0.5, hsv_v=0.4, degrees=5, translate=0.1, scale=0.4, fliplr=0.0,
    )
    # best weights (by validation) -> runs/models/plate_detector/weights/best.pt
    # Final one-time test-set evaluation:
    best = YOLO(f"{PROJECT}/{RUN_NAME}/weights/best.pt")
    m = best.val(data=DATA_YAML, split="test", conf=0.001)
    print(f"Precision {m.box.mp:.4f}  Recall {m.box.mr:.4f}  "
          f"mAP@50 {m.box.map50:.4f}  mAP@50-95 {m.box.map:.4f}")


if __name__ == "__main__":
    main()
