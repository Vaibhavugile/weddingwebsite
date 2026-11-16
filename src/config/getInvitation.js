
import invitations from "./invitations";

/**
 * Get the current wedding invitation using the URL slug.
 *
 * Supported URLs:
 * /divya-shreyash-wedding-invite
 * /divya-shreyash-wedding-invite/
 * /rahul-priya-wedding-invite
 * /rahul-priya-wedding-invite/
 */
export function getInvitation() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const pathname = window.location.pathname || "/";

    const slug = decodeURIComponent(pathname)
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase();

    if (!slug) {
      return null;
    }

    return invitations[slug] || null;
  } catch (error) {
    console.error("[Wedding Invitation] Unable to resolve invitation:", error);
    return null;
  }
}

/**
 * Get an invitation directly by its slug.
 */
export function getInvitationBySlug(slug) {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  const normalizedSlug = slug
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

  return invitations[normalizedSlug] || null;
}

export default getInvitation;
