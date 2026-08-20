const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");

if (!fs.existsSync(standalone)) {
  throw new Error(
    "The Next.js standalone directory does not exist. Run next build first.",
  );
}

const copyDirectory = (source, destination) => {
  fs.cpSync(source, destination, { recursive: true, force: true });
};

copyDirectory(path.join(root, "public"), path.join(standalone, "public"));
copyDirectory(
  path.join(root, ".next", "static"),
  path.join(standalone, ".next", "static"),
);
console.log(
  "Copied public and .next/static into the standalone server directory.",
);
