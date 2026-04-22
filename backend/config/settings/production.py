"""
Production settings for medical software.
These inherit from the main settings module and override as needed.
"""

import os
from . import *  # noqa

DEBUG = False

# Security settings for production
SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'False') == 'True'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Production-specific settings can go here
