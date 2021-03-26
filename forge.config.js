const config = {
  packagerConfig: {
    name: 'jest-repro',
    executableName: 'jest-repro',
    // @electron-forge/plugin-auto-unpack-natives doesn't work, so we have to do
    // it manually. It's actually not required if using a bundler.
    // asar: {
    //   unpack: '*.+(node|dll)',
    // },
    appBundleId: 'com.jest-repro.poc',
    usageDescription: {
      Camera: 'Access is needed to use the Camera',
      Microphone: 'Access is to use the Microphone',
    },
    appCategoryType: 'public.app-category.video',
    osxSign: {
      identity: 'jest-repro',
      hardenedRuntime: true,
      'gatekeeper-assess': false,
      entitlements: 'entitlements.plist',
      'entitlements-inherit': 'entitlements.plist',
      'signature-flags': 'library',
    },
    // osxNotarize: {
    //   appleId: '****',
    //   appleIdPassword: '****',
    // },
  },

  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'jest-repro',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './app/renderer/index.html',
              js: './app/renderer/index.tsx',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
};

module.exports = config;
