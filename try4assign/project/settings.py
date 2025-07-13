CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your React frontend URL
]

CORS_ALLOW_CREDENTIALS = True

INSTALLED_APPS = [
    ...
    'corsheaders',
    'rest_framework',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
] 