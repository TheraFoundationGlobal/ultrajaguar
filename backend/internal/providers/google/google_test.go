package google

import (
	"context"
	"strings"
	"testing"

	"github.com/gary23w/metasearch_api/internal/search"
	"github.com/gary23w/metasearch_api/search/internal/searchtest"
	"github.com/stretchr/testify/require"
)

func TestSearchRaw(t *testing.T) {
	s := New()
	ctx := context.Background()

	req := SearchReq{
		Query: "solar",
	}
	resp, err := s.SearchRaw(ctx, req)
	require.NoError(t, err)
	t.Logf("%d %q", len(resp.Results), resp)
	require.True(t, len(resp.Results) > 2)
	require.True(t, resp.Total >= 1000000000, "%d", resp.Total)

	r := resp.Results[0]
	require.True(t, r.URL != "" && r.Title != "" && r.Content != "")
	require.True(t, strings.HasPrefix(r.URL, "http"))

	req.Offset += len(resp.Results)
	resp, err = s.SearchRaw(ctx, req)
	require.NoError(t, err)
	t.Logf("%d %q", len(resp.Results), resp)
	require.True(t, len(resp.Results) > 2)

	r2 := resp.Results[0]
	require.True(t, r2.URL != "" && r2.Title != "" && r2.Content != "")
	require.True(t, r.URL != r2.URL)
}

func TestSearch(t *testing.T) {
	s := New()
	ctx := context.Background()

	it := s.Search(ctx, search.Request{Query: "solar"})
	defer it.Close()
	var got []search.Result
	for i := 0; i < perPage*2 && it.Next(ctx); i++ {
		got = append(got, it.Result())
	}
	require.NoError(t, it.Err())
	require.True(t, len(got) == perPage*2)
}

func TestGoogle(t *testing.T) {
	s := New()
	searchtest.RunSearchTest(t, s, &searchtest.Config{
		Safe: true,
	})
}
