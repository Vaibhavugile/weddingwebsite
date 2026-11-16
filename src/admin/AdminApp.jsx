
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Heart, CalendarDays, Images, Image,
  MessageCircle, Settings, Plus, Search, ExternalLink,
  Menu, X, Sparkles, ChevronRight, Globe, FolderOpen,
  Pencil, Trash2, Upload, Save, Eye, EyeOff, Loader2,
  ArrowLeft, Music, Video, MapPin, Copy, Check,
} from "lucide-react";

import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { db, storage, firebaseReady } from "../firebase/firebase";
import staticInvitations from "../config/invitations";
import "./AdminApp.css";

const COLLECTION = "weddings";

const DEFAULT_ASSETS = {
  hero: "/assets/wedding-hero.png",
  poster: "/assets/wedding-hero.png",
  video: "/assets/invitation-opening.mp4",
  music: "/assets/wedding-romantic-song.mp3",
  couple: "/assets/animated-indian-wedding-couple.gif",
  venue: "/assets/wedding-venue.gif",
  thankYou: "/assets/thank-you-celebration.gif",
  rsvp: "/assets/wedding-ceremony.gif",
};

const NAVIGATION = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "weddings", label: "Weddings", icon: Heart },
  { id: "events", label: "Celebrations", icon: CalendarDays },
  { id: "media", label: "Media Library", icon: Images },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "rsvps", label: "RSVP Management", icon: MessageCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

const emptyWedding = () => ({
  id: "",
  slug: "",
  bride: "",
  groom: "",
  date: {
    day: "",
    month: "",
    monthNumber: "",
    year: "",
    display: "",
    numeric: "",
  },
  venue: {
    name: "",
    address: "",
    mapUrl: "",
  },
  assets: { ...DEFAULT_ASSETS },
  celebrations: [],
  gallery: [],
  story: [],
  rsvpEnabled: false,
  storyEnabled: false,
  momentsEnabled: false,
  published: false,
});

const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const safeArray = (value) => Array.isArray(value) ? value : [];

function normalizeWedding(wedding, id) {
  return {
    ...emptyWedding(),
    ...wedding,
    id: wedding.id || id,
    slug: wedding.slug || id,
    date: {
      ...emptyWedding().date,
      ...(wedding.date || {}),
    },
    venue: {
      ...emptyWedding().venue,
      ...(wedding.venue || {}),
    },
    assets: {
      ...DEFAULT_ASSETS,
      ...(wedding.assets || {}),
    },
    celebrations: safeArray(wedding.celebrations),
    gallery: safeArray(wedding.gallery),
    story: safeArray(wedding.story),
  };
}

function getInitialWeddings() {
  return Object.entries(staticInvitations).map(([id, wedding]) =>
    normalizeWedding(wedding, id)
  );
}

function AdminSidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <button
          className="admin-mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-icon"><Heart size={22} /></div>
          <div>
            <h2>Wedding Studio</h2>
            <span>INVITATION MANAGEMENT</span>
          </div>
          <button
            className="admin-close-mobile"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="admin-nav-label">WORKSPACE</div>

        <nav className="admin-navigation">
          {NAVIGATION.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`admin-nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => {
                  setActive(item.id);
                  setMobileOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {active === item.id && <ChevronRight size={15} />}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-decoration">✿</div>
          <p>Every love story deserves a beautiful beginning.</p>
          <span>WEDDING STUDIO · 2026</span>
        </div>
      </aside>
    </>
  );
}

function StatCard({ icon: Icon, label, value, description, index }) {
  return (
    <motion.div
      className="admin-stat-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <div className="admin-stat-top">
        <div className="admin-stat-icon"><Icon size={20} /></div>
        <Sparkles size={15} className="admin-stat-sparkle" />
      </div>
      <h3>{value}</h3>
      <p>{label}</p>
      <span>{description}</span>
    </motion.div>
  );
}

function Overview({ weddings, setActive, loading }) {
  const totalEvents = weddings.reduce(
    (sum, wedding) => sum + wedding.celebrations.length, 0
  );

  const totalGallery = weddings.reduce(
    (sum, wedding) => sum + wedding.gallery.length, 0
  );

  const published = weddings.filter((w) => w.published).length;

  return (
    <div className="admin-page-content">
      <div className="admin-welcome-banner">
        <div>
          <span className="admin-overline">YOUR CREATIVE WORKSPACE</span>
          <h2>Every celebration,<br /><span>beautifully managed.</span></h2>
          <p>
            Manage wedding invitations, events, photos and guest experiences
            from one place.
          </p>
          <button
            className="admin-primary-button"
            onClick={() => setActive("create")}
          >
            <Plus size={16} /> Create Wedding
          </button>
        </div>
        <div className="admin-welcome-art">
          <div className="admin-art-circle">
            <Heart size={58} strokeWidth={1} />
            <Sparkles size={20} />
          </div>
          <span>MADE WITH LOVE</span>
        </div>
      </div>

      <div className="admin-section-heading">
        <div><span>AT A GLANCE</span><h3>Studio Overview</h3></div>
      </div>

      <div className="admin-stats-grid">
        <StatCard icon={Heart} label="Total Weddings" value={weddings.length}
          description="Invitation configurations" index={0} />
        <StatCard icon={Globe} label="Published" value={published}
          description="Live invitations" index={1} />
        <StatCard icon={CalendarDays} label="Celebrations" value={totalEvents}
          description="Configured wedding events" index={2} />
        <StatCard icon={Images} label="Gallery Entries" value={totalGallery}
          description="Configured gallery items" index={3} />
      </div>

      <div className="admin-section-heading admin-recent-heading">
        <div><span>YOUR COLLECTION</span><h3>Wedding Invitations</h3></div>
        <button className="admin-text-button" onClick={() => setActive("weddings")}>
          View all <ChevronRight size={16} />
        </button>
      </div>

      {loading ? (
        <div className="admin-loading"><Loader2 className="admin-spinner" /> Loading weddings...</div>
      ) : (
        <div className="admin-wedding-grid">
          {weddings.slice(0, 4).map((wedding, index) => (
            <WeddingCard key={wedding.id} wedding={wedding} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function WeddingCard({ wedding, index, onEdit, onDelete, onPublish }) {
  return (
    <motion.article
      className="admin-wedding-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="admin-wedding-cover">
        <img
          src={wedding.assets?.hero || DEFAULT_ASSETS.hero}
          alt={`${wedding.bride} and ${wedding.groom}`}
        />
        <span className="admin-wedding-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`admin-status ${wedding.published ? "published" : ""}`}>
          {wedding.published ? "Published" : "Draft"}
        </span>
      </div>

      <div className="admin-wedding-info">
        <span className="admin-wedding-label">{wedding.slug}</span>
        <h4>{wedding.bride} & {wedding.groom}</h4>
        <p>{wedding.date?.display || "Date not configured"}</p>

        <div className="admin-wedding-card-footer">
          <a
            href={`/${wedding.slug || wedding.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview <ExternalLink size={14} />
          </a>

          {onEdit && (
            <div className="admin-card-actions">
              <button title="Edit wedding" onClick={() => onEdit(wedding)}>
                <Pencil size={15} />
              </button>
              <button
                title={wedding.published ? "Unpublish" : "Publish"}
                onClick={() => onPublish(wedding)}
              >
                {wedding.published ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              <button
                title="Delete wedding"
                className="danger"
                onClick={() => onDelete(wedding)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Field({ label, children, full = false }) {
  return (
    <label className={`admin-field ${full ? "full" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function WeddingEditor({ initialWedding, onSave, onCancel, saving }) {
  const [form, setForm] = useState(() =>
    normalizeWedding(initialWedding || emptyWedding(), initialWedding?.id || "")
  );
  const [tab, setTab] = useState("details");
  const [jsonError, setJsonError] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateNested = (group, key, value) => {
    setForm((prev) => ({
      ...prev,
      [group]: { ...prev[group], [key]: value },
    }));
  };

  const updateSlugFromNames = () => {
    if (!initialWedding?.id && !form.slug) {
      update("slug", slugify(`${form.bride}-${form.groom}-wedding-invite`));
    }
  };

  const handleDate = (value) => {
    if (!value) return;
    const [year, month, day] = value.split("-");
    const monthNames = [
      "", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
    ];

    setForm((prev) => ({
      ...prev,
      date: {
        day,
        month: monthNames[Number(month)],
        monthNumber: Number(month),
        year,
        display: `${Number(day)} ${monthNames[Number(month)]} ${year}`,
        numeric: `${day} · ${month} · ${year}`,
      },
    }));
  };

  const dateValue = form.date?.year && form.date?.monthNumber && form.date?.day
    ? `${form.date.year}-${String(form.date.monthNumber).padStart(2, "0")}-${String(form.date.day).padStart(2, "0")}`
    : "";

  const jsonValue = (value) => JSON.stringify(value || [], null, 2);

  const parseJson = (key, value) => {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error("Please enter a JSON array.");
      update(key, parsed);
      setJsonError("");
    } catch (error) {
      setJsonError(`${key}: ${error.message}`);
    }
  };

  const tabs = [
    ["details", "Couple & Venue"],
    ["events", "Celebrations"],
    ["gallery", "Gallery & Story"],
    ["assets", "Media & Assets"],
    ["settings", "Settings"],
  ];

  return (
    <div className="admin-editor">
      <div className="admin-editor-heading">
        <div>
          <span>INVITATION BUILDER</span>
          <h2>{initialWedding ? "Edit Wedding" : "Create Wedding"}</h2>
          <p>Build a beautiful invitation for the couple.</p>
        </div>
        <button className="admin-secondary-button" onClick={onCancel}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="admin-editor-tabs">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "details" && (
        <div className="admin-form-card">
          <h3>Couple Information</h3>
          <div className="admin-form-grid">
            <Field label="Bride's name">
              <input value={form.bride} onChange={(e) => update("bride", e.target.value)}
                onBlur={updateSlugFromNames} placeholder="Bride name" />
            </Field>
            <Field label="Groom's name">
              <input value={form.groom} onChange={(e) => update("groom", e.target.value)}
                onBlur={updateSlugFromNames} placeholder="Groom name" />
            </Field>
            <Field label="Invitation URL slug" full>
              <input value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))}
                placeholder="bride-groom-wedding-invite" />
              <small>Invitation URL: /{form.slug || "your-invitation-slug"}</small>
            </Field>
          </div>

          <h3>Wedding Date</h3>
          <div className="admin-form-grid">
            <Field label="Wedding date">
              <input type="date" value={dateValue} onChange={(e) => handleDate(e.target.value)} />
            </Field>
            <Field label="Display date">
              <input value={form.date.display} readOnly placeholder="Select a date" />
            </Field>
          </div>

          <h3>Venue Information</h3>
          <div className="admin-form-grid">
            <Field label="Venue name">
              <input value={form.venue.name}
                onChange={(e) => updateNested("venue", "name", e.target.value)} />
            </Field>
            <Field label="Venue address">
              <input value={form.venue.address}
                onChange={(e) => updateNested("venue", "address", e.target.value)} />
            </Field>
            <Field label="Google Maps URL" full>
              <input value={form.venue.mapUrl}
                onChange={(e) => updateNested("venue", "mapUrl", e.target.value)}
                placeholder="https://maps.google.com/..." />
            </Field>
          </div>
        </div>
      )}

      {tab === "events" && (
        <div className="admin-form-card">
          <h3>Wedding Celebrations</h3>
          <p className="admin-help">
            Add events such as Haldi, Mehndi, Sangeet and Wedding.
            Enter a valid JSON array using the existing celebration structure.
          </p>
          <Field label="Celebrations JSON" full>
            <textarea
              rows={16}
              defaultValue={jsonValue(form.celebrations)}
              key={`events-${form.id}-${tab}`}
              onBlur={(e) => parseJson("celebrations", e.target.value)}
              spellCheck={false}
            />
          </Field>
          <p className="admin-help">
            Each event can include id, number, title, subtitle, date, time,
            venue, image, theme and tag.
          </p>
        </div>
      )}

      {tab === "gallery" && (
        <div className="admin-form-card">
          <h3>Photo Gallery</h3>
          <Field label="Gallery JSON" full>
            <textarea
              rows={12}
              defaultValue={jsonValue(form.gallery)}
              key={`gallery-${form.id}-${tab}`}
              onBlur={(e) => parseJson("gallery", e.target.value)}
              spellCheck={false}
            />
          </Field>

          <h3>Our Story</h3>
          <Field label="Story JSON" full>
            <textarea
              rows={12}
              defaultValue={jsonValue(form.story)}
              key={`story-${form.id}-${tab}`}
              onBlur={(e) => parseJson("story", e.target.value)}
              spellCheck={false}
            />
          </Field>
          <p className="admin-help">
            Gallery and story entries are saved as arrays. Keep the structure
            expected by your existing public components.
          </p>
        </div>
      )}

      {tab === "assets" && (
        <div className="admin-form-card">
          <h3>Invitation Media</h3>
          <p className="admin-help">
            Upload files to Firebase Storage. The resulting URLs will be saved
            with this wedding invitation.
          </p>
          <div className="admin-upload-grid">
            {Object.entries(form.assets).map(([key, value]) => (
              <AssetUploader
                key={key}
                assetKey={key}
                value={value}
                weddingId={form.slug || form.id || "new-wedding"}
                onUploaded={(url) => updateNested("assets", key, url)}
              />
            ))}
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div className="admin-form-card">
          <h3>Invitation Settings</h3>
          {[
            ["published", "Publish invitation", "Make this invitation publicly visible."],
            ["rsvpEnabled", "Enable RSVP", "Show the RSVP section on the invitation."],
            ["storyEnabled", "Enable Our Story", "Show the couple's story section."],
            ["momentsEnabled", "Enable Gallery", "Show the photo gallery section."],
          ].map(([key, label, description]) => (
            <label className="admin-toggle-row" key={key}>
              <div><strong>{label}</strong><small>{description}</small></div>
              <input
                type="checkbox"
                checked={Boolean(form[key])}
                onChange={(e) => update(key, e.target.checked)}
              />
            </label>
          ))}
        </div>
      )}

      {jsonError && <div className="admin-error">{jsonError}</div>}

      <div className="admin-editor-actions">
        <button className="admin-secondary-button" onClick={onCancel}>Cancel</button>
        <button
          className="admin-primary-button"
          disabled={saving || !form.bride.trim() || !form.groom.trim() || !form.slug.trim()}
          onClick={() => onSave(form)}
        >
          {saving ? <Loader2 className="admin-spinner" size={16} /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Wedding"}
        </button>
      </div>
    </div>
  );
}

function AssetUploader({ assetKey, value, weddingId, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file) => {
    if (!file || !storage) return;

    setUploading(true);
    setError("");

    try {
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `weddings/${slugify(weddingId)}/assets/${Date.now()}-${cleanName}`;
      const fileRef = ref(storage, path);

      await uploadBytes(fileRef, file, {
        contentType: file.type || "application/octet-stream",
      });

      const url = await getDownloadURL(fileRef);
      onUploaded(url);
    } catch (err) {
      console.error("Asset upload failed:", err);
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-asset-item">
      <div className="admin-asset-preview">
        {value && /\.(mp4|webm)(\?|$)/i.test(value) ? (
          <Video size={24} />
        ) : value && /\.(mp3|wav|ogg)(\?|$)/i.test(value) ? (
          <Music size={24} />
        ) : (
          <img src={value || DEFAULT_ASSETS[assetKey]} alt={assetKey} />
        )}
      </div>
      <div className="admin-asset-info">
        <strong>{assetKey}</strong>
        <small>{value ? "Asset configured" : "Default asset"}</small>
        <label className="admin-upload-button">
          {uploading ? <Loader2 size={14} className="admin-spinner" /> : <Upload size={14} />}
          {uploading ? "Uploading..." : "Upload file"}
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            disabled={uploading}
            onChange={(e) => upload(e.target.files?.[0])}
          />
        </label>
        {error && <small className="admin-error">{error}</small>}
      </div>
    </div>
  );
}

function PlaceholderPage({ active }) {
  const current = NAVIGATION.find((item) => item.id === active);
  const Icon = current?.icon || Settings;

  return (
    <div className="admin-placeholder">
      <div className="admin-placeholder-icon"><Icon size={34} /></div>
      <span>WEDDING STUDIO</span>
      <h2>{current?.label || "Workspace"}</h2>
      <p>
        This section will be connected to your wedding data in the next stage.
      </p>
    </div>
  );
}

export default function AdminApp() {
  const [active, setActive] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [weddings, setWeddings] = useState(getInitialWeddings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editorWedding, setEditorWedding] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!firebaseReady || !db) {
      setLoading(false);
      setError("Firebase is not configured. Check your environment variables.");
      return undefined;
    }

    const unsubscribe = onSnapshot(
      collection(db, COLLECTION),
      (snapshot) => {
        const remote = snapshot.docs.map((item) =>
          normalizeWedding(item.data(), item.id)
        );

        const remoteMap = new Map(remote.map((item) => [item.id, item]));

        // Firestore records override the static fallback records.
        // A deleted marker hides a static invitation after deletion.
        const merged = new Map();

        Object.entries(staticInvitations).forEach(([id, wedding]) => {
          const remoteWedding = remoteMap.get(id);

          if (remoteWedding?.deleted) return;

          merged.set(
            id,
            remoteWedding || normalizeWedding(wedding, id)
          );
        });

        remote.forEach((wedding) => {
          if (!wedding.deleted) merged.set(wedding.id, wedding);
        });

        setWeddings(Array.from(merged.values()));
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error("Firestore listener error:", err);
        setLoading(false);
        setError(`Could not load Firestore weddings: ${err.message}`);
      }
    );

    return unsubscribe;
  }, []);

  const filteredWeddings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return weddings;

    return weddings.filter((wedding) =>
      `${wedding.bride} ${wedding.groom} ${wedding.slug}`
        .toLowerCase()
        .includes(query)
    );
  }, [weddings, search]);

  const notify = (message) => {
    setSuccess(message);
    window.setTimeout(() => setSuccess(""), 3500);
  };

  const saveWedding = async (form) => {
    if (!db) {
      setError("Firestore is unavailable. Check Firebase configuration.");
      return;
    }

    const slug = slugify(form.slug);
    if (!slug) {
      setError("Please enter a valid invitation URL slug.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const id = form.id || slug;

      const payload = {
        ...normalizeWedding(form, id),
        id,
        slug,
        deleted: false,
        updatedAt: serverTimestamp(),
      };

      if (!form.createdAt) payload.createdAt = serverTimestamp();

      await setDoc(doc(db, COLLECTION, id), payload, { merge: true });

      setEditorWedding(null);
      setActive("weddings");
      notify("Wedding invitation saved successfully.");
    } catch (err) {
      console.error("Save wedding failed:", err);
      setError(`Unable to save wedding: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const editWedding = (wedding) => {
    setEditorWedding(normalizeWedding(wedding, wedding.id));
    setActive("create");
    setError("");
  };

  const deleteWedding = async (wedding) => {
    const confirmed = window.confirm(
      `Delete the invitation for ${wedding.bride} & ${wedding.groom}? This cannot be undone.`
    );

    if (!confirmed || !db) return;

    try {
      if (staticInvitations[wedding.id]) {
        // Keep a tombstone so the static fallback does not reappear.
        await setDoc(doc(db, COLLECTION, wedding.id), {
          id: wedding.id,
          slug: wedding.slug,
          deleted: true,
          updatedAt: serverTimestamp(),
        });
      } else {
        await deleteDoc(doc(db, COLLECTION, wedding.id));
      }

      notify("Wedding invitation deleted.");
    } catch (err) {
      setError(`Unable to delete wedding: ${err.message}`);
    }
  };

  const togglePublish = async (wedding) => {
    if (!db) return;

    try {
      await setDoc(
        doc(db, COLLECTION, wedding.id),
        {
          ...wedding,
          published: !wedding.published,
          deleted: false,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      notify(wedding.published ? "Invitation unpublished." : "Invitation published.");
    } catch (err) {
      setError(`Unable to update publishing status: ${err.message}`);
    }
  };

  const title =
    NAVIGATION.find((item) => item.id === active)?.label ||
    (active === "create" ? (editorWedding ? "Edit Wedding" : "Create Wedding") : "Workspace");

  return (
    <div className="wedding-admin">
      <AdminSidebar
        active={active}
        setActive={(page) => {
          setActive(page);
          if (page !== "create") setEditorWedding(null);
          setError("");
        }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

          <div className="admin-breadcrumb">
            <span>Wedding Studio</span>
            <ChevronRight size={14} />
            <strong>{title}</strong>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-live-indicator">
              <span />
              {firebaseReady ? "FIREBASE CONNECTED" : "FIREBASE NOT CONFIGURED"}
            </div>
            <div className="admin-avatar">W</div>
          </div>
        </header>

        <div className="admin-content">
          {error && (
            <div className="admin-alert admin-alert-error">
              {error}
              <button onClick={() => setError("")}><X size={15} /></button>
            </div>
          )}

          {success && (
            <div className="admin-alert admin-alert-success">
              <Check size={16} /> {success}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {active === "overview" && (
                <Overview weddings={weddings} setActive={setActive} loading={loading} />
              )}

              {active === "weddings" && (
                <div className="admin-page-content">
                  <div className="admin-section-heading">
                    <div>
                      <span>INVITATION MANAGEMENT</span>
                      <h3>All Weddings</h3>
                      <p>Manage every couple's wedding website.</p>
                    </div>
                    <button
                      className="admin-primary-button"
                      onClick={() => {
                        setEditorWedding(null);
                        setActive("create");
                      }}
                    >
                      <Plus size={17} /> Create Wedding
                    </button>
                  </div>

                  <div className="admin-search-box">
                    <Search size={18} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search couples or invitation URLs..."
                    />
                  </div>

                  {loading ? (
                    <div className="admin-loading"><Loader2 className="admin-spinner" /> Loading...</div>
                  ) : (
                    <div className="admin-wedding-grid">
                      {filteredWeddings.map((wedding, index) => (
                        <WeddingCard
                          key={wedding.id}
                          wedding={wedding}
                          index={index}
                          onEdit={editWedding}
                          onDelete={deleteWedding}
                          onPublish={togglePublish}
                        />
                      ))}
                      {filteredWeddings.length === 0 && (
                        <div className="admin-empty-state">
                          <FolderOpen size={32} />
                          <h3>No invitations found</h3>
                          <p>Create a new wedding or change your search.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {active === "create" && (
                <WeddingEditor
                  key={editorWedding?.id || "new"}
                  initialWedding={editorWedding}
                  onSave={saveWedding}
                  onCancel={() => {
                    setEditorWedding(null);
                    setActive("weddings");
                  }}
                  saving={saving}
                />
              )}

              {active !== "overview" &&
                active !== "weddings" &&
                active !== "create" && (
                  <PlaceholderPage active={active} />
                )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="admin-footer">
          <span>WEDDING STUDIO</span>
          <span>CRAFTING BEAUTIFUL CELEBRATIONS ♡</span>
        </footer>
      </main>
    </div>
  );
}
