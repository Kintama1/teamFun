#!/bin/bash
set -e  # Exit on any error

echo "🚀 Setting up Flask + React project..."
echo ""

# Check prerequisites
echo "Checking prerequisites..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Backend setup
echo "📦 Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "✅ Backend setup complete"
cd ..

# Frontend setup
echo "⚛️  Setting up frontend..."
cd frontend
npm install
echo "✅ Frontend setup complete"
cd ..

# Root dependencies
echo "🔧 Installing root dependencies..."
npm install

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "Or start servers separately:"
echo "  npm run backend    # Flask server"
echo "  npm run frontend   # React server"