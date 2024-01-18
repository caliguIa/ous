{
  description = "oneup sales dev shell";

  inputs = {
      nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };
  
  outputs = { nixpkgs, ... }:
    let
      system = "aarch64-darwin";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.aarch64-darwin.default =
        pkgs.mkShell  {
          nativeBuildInputs = with pkgs; [
            bun
          ];
          shellHook = ''
            echo "oneup sales dev nix-shell"
          '';
      };
    };
}
