using Core.Domain.Interfaces;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Domain.Entities
{
    public abstract class Entity<T> : IEntity where T : Entity<T>
    {
        public Guid Id { get; protected set; }
        public DateTime CreatedAt { get; protected set; }

        public override bool Equals(object? obj)
        {
            var compareTo = obj as Entity<T>;

            if (ReferenceEquals(this, compareTo)) return true;
            if (ReferenceEquals(null, compareTo)) return false;

            return Id.Equals(compareTo.Id);
        }

        public static bool operator ==(Entity<T> a, Entity<T>? b)
        {
            if (ReferenceEquals(a, null) && ReferenceEquals(b, null))
                return true;

            if (ReferenceEquals(a, null) || ReferenceEquals(b, null))
                return false;

            return a.Equals(b);
        }

        public static bool operator !=(Entity<T> a, Entity<T> b) =>
            !(a == b);

        public override int GetHashCode() =>
            (GetType().GetHashCode() * 451) + Id.GetHashCode();
    }
}