import logging
from logging.handlers import RotatingFileHandler
import os
from pathlib import Path
from typing import Optional
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "timestamp": datetime.now().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)
        
        return json.dumps(log_record)
    

class StringFormatter(logging.Formatter):
    def __init__(
        self, 
        fmt: str = "%(asctime)s - %(levelname)s - %(name)s - %(module)s.%(funcName)s:%(lineno)d - %(message)s",
        datefmt: str = "%Y-%m-%d %H:%M:%S",
    ):
        super().__init__(fmt=fmt, datefmt=datefmt)

    def format(self, record):
        # Format the main message
        formatted = super().format(record)
        
        # Append exception info if present
        if record.exc_info:
            formatted += "\n" + self.formatException(record.exc_info)
        
        return formatted

class LoggerManager:
    _loggers = {}
    
    def __init__(self):
        raise NotImplementedError("LoggerManager is not meant to be instantiated")
    
    @classmethod
    def get_logger(
        cls, 
        name: str = "app",
        log_level: int = logging.INFO,
        log_file: str = "logs/app.log",  # Default log file
        max_bytes: int = 10 * 1024 * 1024,  # 10 MB
        backup_count: int = 5
    ) -> logging.Logger:
        """
        Get a logger that writes ONLY to the specified log file (no console output).
        
        Args:
            name: Logger name (usually __name__)
            log_level: Logging level (e.g., logging.INFO)
            log_file: Path to log file (required)
            max_bytes: Max log file size before rotation
            backup_count: Number of backup logs to keep
            
        Returns:
            Configured logger instance
        """
        if name in cls._loggers:
            return cls._loggers[name]
        
        logger = logging.getLogger(name)
        logger.setLevel(log_level)
        
        # Prevent adding handlers multiple times
        if not logger.handlers:
            # Create formatter
            # formatter = JSONFormatter()
            formatter = StringFormatter()
            
            # Ensure log directory exists
            log_path = Path(log_file)
            log_path.parent.mkdir(parents=True, exist_ok=True)
            
            # File handler (ONLY this handler is added)
            file_handler = RotatingFileHandler(
                log_file,
                maxBytes=max_bytes,
                backupCount=backup_count,
                encoding='utf-8'
            )
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)
        
        cls._loggers[name] = logger
        return logger

# Default logger configuration (writes only to logs/app.log)
def configure_default_logger():
    log_file_name = f"logs/{datetime.now().date()}.log"
    log_level = os.getenv("LOG_LEVEL", "INFO").upper()
    log_file = os.getenv("LOG_FILE", log_file_name)  # Default file
    
    return LoggerManager.get_logger(
        name="app",
        log_level=getattr(logging, log_level, logging.INFO),
        log_file=log_file  # Ensures logging goes only to the file
    )

# Global logger instance (file-only)
logger = configure_default_logger()