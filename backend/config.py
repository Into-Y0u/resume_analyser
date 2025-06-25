from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from src.handler.logging.log_manager import LoggerManager

logger = LoggerManager.get_logger(__name__)

@asynccontextmanager
async def on_start_events(app: FastAPI):
    logger.info("🚀 Application starting up")
    try:
        # Initialize resources (DB, Redis, etc.)
        logger.info("Initializing database connection...")
        yield
    finally:
        # Cleanup resources
        logger.info("🛑 Application shutting down")