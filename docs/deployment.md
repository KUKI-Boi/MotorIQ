# Deployment Strategy

MotorIQ is a client-side Single Page Application (SPA). Because the backend is an embedded device (ESP32), the deployment of the web application can be handled in multiple ways depending on the physical networking environment.

## Environment Variables

The application relies on environment variables to determine how to communicate with the hardware.

Create a `.env` file in the root directory:

```env
# .env.development
VITE_API_MODE=mock              # 'mock' or 'live'
VITE_ESP32_IP=192.168.1.100     # Ignored if mode is mock
VITE_WS_PORT=81
```

```env
# .env.production
VITE_API_MODE=live
VITE_ESP32_IP=192.168.1.100     # Static IP of the controller on the factory floor
VITE_WS_PORT=81
```

## Build Process

MotorIQ uses Vite for lightning-fast bundling.

1. **Clean & Build:**
   ```bash
   npm run build
   ```
2. **Output:** 
   Vite compiles the React application into highly optimized static HTML, CSS, and JS files located in the `/dist` directory.

## Deployment Options

### Option 1: Hosted on the ESP32 (Standalone Mode)
For entirely enclosed systems without external network access, the MotorIQ `/dist` files can be compressed (gzip) and uploaded directly to the ESP32's SPIFFS or LittleFS filesystem. 
- **Pros:** No external servers required. System is entirely self-contained.
- **Cons:** Storage space on ESP32 is highly limited. Requires extreme optimization of image assets.

### Option 2: Local Edge Server (Recommended for Factory Floor)
The `/dist` folder is hosted on an industrial PC, Raspberry Pi, or local network NGINX server situated on the same LAN as the ESP32 controller.
- **Pros:** Fast load times. Device has plenty of storage. Updates to the UI do not require flashing the ESP32.
- **Cons:** Requires a secondary piece of hardware.

### Option 3: Cloud Hosted (Remote Monitoring)
Hosted on Vercel, AWS S3, or Netlify.
- **Note:** This requires the ESP32 to be exposed to the internet or connected via a secure VPN/WebSocket tunnel to a cloud relay, which involves significant security considerations.

## Testing Strategy

- **Unit Testing:** Vitest will be used for testing utility functions and pure logic (e.g., data formatting).
- **Component Testing:** React Testing Library will be used to ensure UI components render correctly based on props.
- **Hardware-in-the-Loop (HIL):** Final validation must occur connected to the physical ESP32 and motor to verify WebSocket stability and UI performance under real network conditions.

## Versioning
Follow Semantic Versioning (SemVer) strictly: `MAJOR.MINOR.PATCH`.
- **Patch:** UI bug fixes.
- **Minor:** New charts, new non-breaking UI features.
- **Major:** Changes to the API contract requiring simultaneous ESP32 firmware updates.
