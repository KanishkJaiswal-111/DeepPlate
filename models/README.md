# PlateGuard – code skeleton

Pipeline: OpenCV frames → YOLO → crop → (minimal) preprocess → PaddleOCR → `{plate_text, ocr_confidence}`

```
pip install -r requirements.txt
# 1. fill blanks in scripts/prepare_dataset.py, configs/plate_data.yaml, scripts/train_yolo.py
python scripts/prepare_dataset.py
python scripts/train_yolo.py
# 2. run
python main.py --video traffic.mp4 --weights runs/models/plate_detector/weights/best.pt
# 3. evaluate
python -m scripts.evaluate detection --weights <best.pt>
python -m scripts.evaluate ocr --manifest ocr_manifest.csv
python -m scripts.evaluate system --weights <best.pt> --video traffic.mp4
pytest tests
```
