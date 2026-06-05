package images

import (
	"bytes"
	"image"
	"image/color"
	"image/draw"
	"image/png"
)

type palette struct {
	sky1, sky2, sea1, sea2, hull, mast, sail, accent color.RGBA
}

var palettes = []palette{
	{hex(0x60B5E6), hex(0x3B82F6), hex(0x1E6FA0), hex(0x1A4A7A), hex(0xF5F5F5), hex(0xFFFFFF), hex(0xE0F2FE), hex(0xF59E0B)},
	{hex(0x6EE7B7), hex(0x34D399), hex(0x0F766E), hex(0x0D5E5A), hex(0xF0FDF4), hex(0xFFFFFF), hex(0xD1FAE5), hex(0x10B981)},
	{hex(0xA78BFA), hex(0x8B5CF6), hex(0x6D28D9), hex(0x5B21B6), hex(0xF5F3FF), hex(0xFFFFFF), hex(0xEDE9FE), hex(0x7C3AED)},
	{hex(0xF472B6), hex(0xEC4899), hex(0xBE185D), hex(0x9D174D), hex(0xFDF2F8), hex(0xFFFFFF), hex(0xFCE7F3), hex(0xDB2777)},
	{hex(0xFCD34D), hex(0xFBBF24), hex(0xD97706), hex(0xB45309), hex(0xFFFBEB), hex(0xFFFFFF), hex(0xFEF3C7), hex(0xF59E0B)},
	{hex(0x818CF8), hex(0x6366F1), hex(0x4338CA), hex(0x3730A3), hex(0xEEF2FF), hex(0xFFFFFF), hex(0xE0E7FF), hex(0x4F46E5)},
}

func hex(c uint32) color.RGBA {
	return color.RGBA{uint8(c >> 16), uint8(c >> 8 & 0xFF), uint8(c & 0xFF), 255}
}

func lerpC(a, b color.RGBA, t float64) color.RGBA {
	return color.RGBA{
		uint8(float64(a.R) + t*float64(b.R-a.R)),
		uint8(float64(a.G) + t*float64(b.G-a.G)),
		uint8(float64(a.B) + t*float64(b.B-a.B)),
		255,
	}
}

func fillGradient(img *image.RGBA, top, bot color.RGBA) {
	b := img.Bounds()
	for y := b.Min.Y; y < b.Max.Y; y++ {
		t := float64(y-b.Min.Y) / float64(b.Max.Y-b.Min.Y)
		c := lerpC(top, bot, t)
		for x := b.Min.X; x < b.Max.X; x++ {
			img.Set(x, y, c)
		}
	}
}

func fillRect(img *image.RGBA, x0, y0, x1, y1 int, c color.Color) {
	draw.Draw(img, image.Rect(x0, y0, x1, y1), &image.Uniform{c}, image.Point{}, draw.Src)
}

func fillTriangle(img *image.RGBA, x1, y1, x2, y2, x3, y3 int, c color.Color) {
	// scanline fill for a triangle
	minY := min(y1, min(y2, y3))
	maxY := max(y1, max(y2, y3))
	for y := minY; y <= maxY; y++ {
		if y < 0 || y >= img.Bounds().Max.Y {
			continue
		}
		var xs []int
		edges := [][2]int{{x1, y1}, {x2, y2}, {x3, y3}}
		for i := 0; i < 3; i++ {
			ax, ay := edges[i][0], edges[i][1]
			bx, by := edges[(i+1)%3][0], edges[(i+1)%3][1]
			if ay == by {
				continue
			}
			if (y < ay && y < by) || (y > ay && y > by) {
				continue
			}
			t := float64(y-ay) / float64(by-ay)
			xs = append(xs, int(float64(ax)+t*float64(bx-ax)))
		}
		if len(xs) < 2 {
			continue
		}
		xl, xr := xs[0], xs[1]
		if xl > xr {
			xl, xr = xr, xl
		}
		for x := xl; x <= xr; x++ {
			if x >= 0 && x < img.Bounds().Max.X {
				img.Set(x, y, c)
			}
		}
	}
}

func fillTrapezoid(img *image.RGBA, x1, y1, x2, y2, x3, y3, x4, y4 int, c color.Color) {
	minY := min(y1, min(y2, min(y3, y4)))
	maxY := max(y1, max(y2, max(y3, y4)))
	for y := minY; y <= maxY; y++ {
		if y < 0 || y >= img.Bounds().Max.Y {
			continue
		}
		var xs []int
		pts := [][2]int{{x1, y1}, {x2, y2}, {x3, y3}, {x4, y4}}
		for i := 0; i < 4; i++ {
			ax, ay := pts[i][0], pts[i][1]
			bx, by := pts[(i+1)%4][0], pts[(i+1)%4][1]
			if ay == by {
				continue
			}
			if (y < ay && y < by) || (y > ay && y > by) {
				continue
			}
			t := float64(y-ay) / float64(by-ay)
			xs = append(xs, int(float64(ax)+t*float64(bx-ax)))
		}
		if len(xs) < 2 {
			continue
		}
		xl, xr := xs[0], xs[1]
		if xl > xr {
			xl, xr = xr, xl
		}
		for x := xl; x <= xr; x++ {
			if x >= 0 && x < img.Bounds().Max.X {
				img.Set(x, y, c)
			}
		}
	}
}

func GenerateBoatImage(id int) ([]byte, error) {
	const W, H = 600, 400
	p := palettes[id%len(palettes)]

	img := image.NewRGBA(image.Rect(0, 0, W, H))

	skyH := H * 55 / 100
	seaH := H - skyH

	// fill sky gradient
	for y := 0; y < skyH; y++ {
		t := float64(y) / float64(skyH)
		c := lerpC(p.sky1, p.sky2, t)
		for x := 0; x < W; x++ {
			img.Set(x, y, c)
		}
	}

	// fill sea gradient
	for y := 0; y < seaH; y++ {
		t := float64(y) / float64(seaH)
		c := lerpC(p.sea1, p.sea2, t)
		for x := 0; x < W; x++ {
			img.Set(x, y+skyH, c)
		}
	}

	// draw sun reflection
	for i := 0; i < 3; i++ {
		ox := W/2 - 80 + i*80
		oy := skyH + 20 + i*25
		r := 15 + i*8
		for dy := -r; dy <= r; dy++ {
			for dx := -r; dx <= r; dx++ {
				if dx*dx+dy*dy <= r*r {
					x, y := ox+dx, oy+dy
					if x >= 0 && x < W && y >= 0 && y < H {
						cr, cg, cb, _ := img.At(x, y).RGBA()
						alpha := 30 - i*8
						if alpha < 5 {
							alpha = 5
						}
						img.Set(x, y, color.RGBA{
							uint8((cr>>8)*uint32(100-alpha)/100 + uint32(p.accent.R)*uint32(alpha)/100),
							uint8((cg>>8)*uint32(100-alpha)/100 + uint32(p.accent.G)*uint32(alpha)/100),
							uint8((cb>>8)*uint32(100-alpha)/100 + uint32(p.accent.B)*uint32(alpha)/100),
							255,
						})
					}
				}
			}
		}
	}

	// boat hull (trapezoid)
	hullY1 := skyH + 40
	hullY2 := skyH + 90
	hullX1 := W/2 - 100
	hullX2 := W/2 + 100
	fillTrapezoid(img, hullX1+30, hullY1, hullX2-30, hullY1, hullX2, hullY2, hullX1, hullY2, p.hull)

	// hull bottom stripe
	fillRect(img, hullX1, hullY2-6, hullX2, hullY2, p.accent)

	// cabin
	cabW := 60
	cabH := 25
	cabX := W/2 - cabW/2
	cabY := hullY1 - cabH
	fillRect(img, cabX, cabY, cabX+cabW, cabY+cabH, p.mast)

	// cabin window
	fillRect(img, cabX+8, cabY+5, cabX+cabW-8, cabY+cabH-5, p.sea1)

	// mast
	mastW := 4
	mastX := W/2 - mastW/2
	mastY := skyH - 60
	fillRect(img, mastX, mastY, mastX+mastW, hullY1, p.mast)

	// sail (triangle)
	sailTopY := mastY + 5
	sailBotY := hullY1 - 5
	sailLeftX := mastX + mastW
	sailRightX := sailLeftX + 70
	fillTriangle(img, sailLeftX, sailTopY, sailRightX, (sailTopY+sailBotY)/2, sailLeftX, sailBotY, p.sail)

	// waves at horizon
	for w := 0; w < 6; w++ {
		wx := w * 100
		wy := skyH - 5
		for dy := 0; dy < 10; dy++ {
			for dx := 0; dx < 120; dx++ {
				x, y := wx+dx-int(10*float64(dx)/120), wy+dy
				if x >= 0 && x < W && y >= 0 && y < H {
					img.Set(x, y, p.sea1)
				}
			}
		}
	}

	var buf bytes.Buffer
	if err := png.Encode(&buf, img); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
