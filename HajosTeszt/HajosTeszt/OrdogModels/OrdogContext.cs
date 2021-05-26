using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace HajosTeszt.OrdogModels
{
    public partial class OrdogContext : DbContext
    {
        public OrdogContext()
        {
        }

        public OrdogContext(DbContextOptions<OrdogContext> options)
            : base(options)
        {
        }

        public virtual DbSet<OrdogTabla> OrdogTablas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source =.\\sqlexpressandrew; Initial Catalog = Ordog; Integrated Security = True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Hungarian_CI_AS");

            modelBuilder.Entity<OrdogTabla>(entity =>
            {
                entity.HasKey(e => e.Nev);

                entity.ToTable("OrdogTabla");

                entity.Property(e => e.Nev).HasMaxLength(50);

                entity.Property(e => e.Eredet).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
