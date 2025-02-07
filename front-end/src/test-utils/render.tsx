// ./test-utils/render.tsx
import { render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "../utils";
import { MockedProvider } from "@apollo/client/testing";
// Import your theme object

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MockedProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
          {children}
        </MantineProvider>
      </MockedProvider>
    ),
  });
}
