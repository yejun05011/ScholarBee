import json
import sys
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# HuggingFace 모델 경로
MODEL_NAME = "memm159/kobert_scholar_clf"

# 모델 & 토크나이저 로드 (최초 1회 캐시됨)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()

# CSV 기반 최종 라벨셋
id2label = {
    0: "ELIGIBILITY",
    1: "AMOUNT_QUOTA",
    2: "APPLICATION_PERIOD",
    3: "REQUIRED_DOCS",
    4: "OTHER"
}

def predict(text: str):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        max_length=256
    )

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        pred_id = torch.argmax(logits, dim=-1).item()

    label = id2label.get(pred_id, "OTHER")
    return {"label_id": pred_id, "label": label}

if __name__ == "__main__":
    try:
        input_text = sys.argv[1]
        result = predict(input_text)
        print(json.dumps(result, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)}))