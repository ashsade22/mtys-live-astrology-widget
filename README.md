# mtys-live-astrology-widget
Hosted Wix custom element for More Than Your Sun live astrology.

## Know Your Chart

The Know Your Chart experience is a separate custom element. It has no Wix CMS dependency and does not import or modify the live astrology widget.

Files:

* `mtys-know-your-chart.js` defines the custom element and interaction behavior.
* `know-your-chart-content.js` contains the six placement guides and 72 sign readings.
* `know-your-chart-styles.js` contains the responsive MTYS presentation layer.
* `know-your-chart-preview.html` provides a standalone preview for review and testing.

Wix custom element tag:

```text
mtys-know-your-chart
```

Hosted script URL:

```text
https://ashsade22.github.io/mtys-live-astrology-widget/mtys-know-your-chart.js
```

The component supports direct states through query parameters, including:

```text
?placement=moon
?placement=moon&sign=aries
```
