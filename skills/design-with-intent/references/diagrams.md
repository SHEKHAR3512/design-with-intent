# Diagrams for design decisions

Use only when a flow, information architecture, or explanatory visual helps the requested work. This is original DWI guidance; the Excalidraw project in sources.md is an external reference, not bundled code or a renderer.

Start with the question the diagram must answer. Show a sequence as connected steps; alternatives as branches; ownership as lanes; hierarchy as containment. Equal boxes in a grid rarely explain these relationships. Use actual route names, states, or data relationships from the project; mark proposals as proposals.

For a small flow, Mermaid or an existing repository-native SVG is sufficient. Keep labels short, arrows directional, and the reading order clear. Include an error or cancellation path if it affects the main decision. Add a text equivalent where the diagram conveys information a user needs.

When the user requests Excalidraw output, use available Excalidraw tooling and its actual schema; do not invent JSON properties. If a renderer is available, open the result and check text clipping, arrow anchors, label overlap, and contrast. If it is not available, clearly distinguish a drafted file from a visually validated artifact. A diagram is not evidence that the corresponding application behavior has been implemented.
