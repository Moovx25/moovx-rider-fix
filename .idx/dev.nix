{ pkgs, ... }: {
       # Which nixpkgs channel to use
       channel = "stable-23.11";
       # Use https://search.nixos.org/packages to find packages
       packages = [
         pkgs.nodejs_20
         pkgs.jdk21_headless
         pkgs.gradle
       ];
       # Sets environment variables
       env = {
         EXPO_USE_FAST_RESOLVER = "1";
       };
       idx = {
         # Extensions from https://open-vsx.org/
         extensions = [
           "msjsdiag.vscode-react-native"
           "fwcd.kotlin"
         ];
         workspace = {
           # Runs on workspace creation
           onCreate = {
             install-and-prebuild = ''
               npm ci --prefer-offline --no-audit --no-progress --timing && npm i @expo/ngrok@^4.1.0 && npx -y expo install expo-dev-client && npx -y expo prebuild --platform android
               # Increase JVM memory
               sed -i 's/org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m/org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m/' "android/gradle.properties"
             '';
           };
           # Runs on workspace restart
           onStart = {
             android = ''
               echo -e "\033[1;33mWaiting for Android emulator to be ready...\033[0m"
               adb -s emulator-5554 wait-for-device && npm run android
             '';
           };
         };
         # Enable previews
         previews = {
           enable = true;
           previews = {
             web = {
               command = [ "npm" "run" "web" "--" "--port" "$PORT" ];
               manager = "web";
             };
             android = {
               command = [ "tail" "-f" "/dev/null" ];
               manager = "web";
             };
           };
         };
       };
     }