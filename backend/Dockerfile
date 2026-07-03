FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/workspace

WORKDIR /workspace/backend

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
 && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --upgrade pip \
 && pip install ".[test]"

COPY pyproject.toml .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]