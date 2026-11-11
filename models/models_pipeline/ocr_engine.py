"""PaddleOCR wrapper. Works with PaddleOCR 3.x (predict) and falls back to 2.x (ocr)."""
from dataclasses import dataclass
from typing import List

import numpy as np

from .config import OCRConfig


@dataclass
class OCRLine:
    text: str
    confidence: float
    x_center: float
    y_center: float
    height: float


class PlateOCR:
    def __init__(self, cfg: OCRConfig):
        self.cfg = cfg
        from paddleocr import PaddleOCR
        try:    # PaddleOCR 3.x
            self.engine = PaddleOCR(
                lang=cfg.lang,
                use_doc_orientation_classify=cfg.use_doc_orientation_classify,
                use_doc_unwarping=cfg.use_doc_unwarping,
                use_textline_orientation=cfg.use_textline_orientation,
                device=cfg.device,
                enable_mkldnn=cfg.enable_mkldnn,
            )
            self.v3 = True
        except TypeError:   # PaddleOCR 2.x
            self.engine = PaddleOCR(lang=cfg.lang, use_angle_cls=cfg.use_textline_orientation,
                                    use_gpu=cfg.device.startswith("gpu"), show_log=False)
            self.v3 = False

    def recognise(self, image: np.ndarray) -> List[OCRLine]:
        lines: List[OCRLine] = []
        if self.v3:
            for res in self.engine.predict(image):
                data = res.json["res"] if hasattr(res, "json") else res
                texts = data.get("rec_texts", [])
                scores = data.get("rec_scores", [])
                polys = data.get("rec_polys", data.get("dt_polys", []))
                for t, s, p in zip(texts, scores, polys):
                    lines.append(self._line(t, s, p))
        else:
            out = self.engine.ocr(image, cls=self.cfg.use_textline_orientation)
            for page in out or []:
                for poly, (t, s) in page or []:
                    lines.append(self._line(t, s, poly))
        return lines

    @staticmethod
    def _line(text, score, poly) -> OCRLine:
        p = np.asarray(poly, dtype=float).reshape(-1, 2)
        return OCRLine(str(text), float(score), float(p[:, 0].mean()),
                       float(p[:, 1].mean()), float(p[:, 1].max() - p[:, 1].min()))
