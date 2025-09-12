import { ConnectButton, useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import HTMLFlipBook from "react-pageflip";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Environment variables for $MNM configuration
const COIN_TYPE = import.meta.env.VITE_MNM_COIN_TYPE as string || "0xefde5ddb743bd93e68a75e410e985980457b5e8837c7f4afa36ecc12bb91022b::mnm::MNM";
const GATE_MIN = Number(import.meta.env.VITE_MNM_MIN ?? "100000000"); // 0.1 MNM with 9 decimals

// Comic pages array
const COMIC_PAGES = [
  "/pages/01.jpg",
  "/pages/02.jpg",
  "/pages/03.jpg",
  "/pages/04.jpg",
  "/pages/05.jpg",
  "/pages/06.jpg",
  "/pages/07.jpg",
];

export default function ComicPage() {
  const account = useCurrentAccount();
  
  // Query the user's $MNM balance
  const { data: balance, isLoading: balanceLoading } = useSuiClientQuery(
    "getBalance",
    { owner: account?.address || "", coinType: COIN_TYPE },
    { enabled: !!account?.address }
  );

  // Check if user has enough $MNM tokens
  const unlocked = useMemo(() => {
    if (!balance) return false;
    return BigInt(balance.totalBalance ?? 0) >= BigInt(GATE_MIN);
  }, [balance]);

  // Calculate readable MNM amount needed
  const mnmNeeded = (GATE_MIN / 1e9).toFixed(2);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Little Man Comic</h1>
          </div>
          <ConnectButton data-testid="button-connect-wallet" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        {!account && (
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔗</span>
              </div>
              <h2 className="text-xl font-semibold" data-testid="text-connect-prompt">
                Unlock the Little Man Comic with $MNM
              </h2>
              <p className="text-muted-foreground">
                Connect your Sui wallet to continue and unlock exclusive comic content.
              </p>
            </CardContent>
          </Card>
        )}

        {account && balanceLoading && (
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto animate-pulse">
                <span className="text-2xl">⏳</span>
              </div>
              <h2 className="text-xl font-semibold">Checking your $MNM balance...</h2>
              <p className="text-muted-foreground">
                Please wait while we verify your token holdings.
              </p>
            </CardContent>
          </Card>
        )}

        {account && !balanceLoading && !unlocked && (
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold" data-testid="text-insufficient-balance">
                  You need at least {mnmNeeded} $MNM to unlock this comic
                </h2>
                <p className="text-muted-foreground">
                  Current balance: {balance ? (Number(balance.totalBalance) / 1e9).toFixed(4) : '0'} $MNM
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Pick up some $MNM tokens to unlock the comic:
                </p>
                <Button asChild className="w-full" data-testid="button-get-mnm">
                  <a
                    href="https://blast.fun/token/0xefde5ddb743bd93e68a75e410e985980457b5e8837c7f4afa36ecc12bb91022b::mnm::MNM"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get $MNM (Little Man Token)
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {account && !balanceLoading && unlocked && (
          <div className="w-full max-w-5xl space-y-6">
            {/* Success message */}
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-unlocked-message">
                Thanks for supporting Little Man! Enjoy the comic.
              </p>
            </div>

            {/* Flipbook Comic */}
            <div className="flex justify-center">
              <div className="comic-book-container">
                <HTMLFlipBook 
                  width={400} 
                  height={600}
                  size="stretch"
                  minWidth={300}
                  maxWidth={500}
                  minHeight={450}
                  maxHeight={750}
                  drawShadow={true}
                  flippingTime={600}
                  usePortrait={true}
                  startZIndex={0}
                  data-testid="flipbook-comic"
                >
                  {COMIC_PAGES.map((page, index) => (
                    <div key={index} className="page">
                      <img
                        src={page}
                        alt={`Comic page ${index + 1}`}
                        className="w-full h-full object-contain"
                        loading={index === 0 ? "eager" : "lazy"}
                        data-testid={`comic-page-${index + 1}`}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              </div>
            </div>

            {/* Footer info */}
            <div className="text-center text-sm text-muted-foreground">
              <p data-testid="text-episode-info">
                Episode 1 • Powered by Sui • $MNM
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}