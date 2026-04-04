{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext", 
    "types": [
        "@citizenfx/client",
        "@citizenfx/server"
    ],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      // !important ./
      "@modules/*": ["./modules/*"],
      "@blips/*": ["./modules/blips/*"]
    }
  },
  "include": ["**/*.ts", "**/*.js", "types.d.ts"],
  "exclude": ["node_modules", "dist"]
}
